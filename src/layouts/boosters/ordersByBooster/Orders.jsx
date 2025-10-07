import React, {useCallback, useEffect, useMemo, useState} from 'react'
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {getOrdersByBooster} from "src/services/orderApi.js";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OrdersTableBody from "src/layouts/boosters/ordersByBooster/utils/ui/OrdersTableBody.jsx";
import OrdersTableHead from "src/layouts/boosters/ordersByBooster/utils/ui/OrdersTableHead.jsx";
import {Box, useMediaQuery} from "@mui/material";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import OrdersMobileView from "src/layouts/boosters/ordersByBooster/utils/ui/OrdersMobileView.jsx";

const Orders = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    const [allOrders, setAllOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        statuses: [IN_PROGRESS],
        gameNames: [],
        gamePlatforms: [],
        price: {
            priceFrom: null,
            priceTo: null
        },
        sort: {
            key: null,
            asc: false
        }
    });


    const fetchAllOrders = useCallback(async () => {
        setAllOrders([])
        try {
            setIsLoading(true);
            const allOrdersApi = await getOrdersByBooster(selectedFilters)
            setAllOrders(allOrdersApi);
        } catch (err) {
            setAllOrders([]);
            setError(handleApiError(err))
        } finally {
            setIsLoading(false);
        }
    }, [getOrdersByBooster, setAllOrders, selectedFilters]);

    const renderOrders = useMemo(() => {
        if (isMobile) {
            return (
                <OrdersMobileView
                    orders={allOrders}
                    loading={isLoading}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
            )
        }

        return (
            <TableContainer sx={{height: '100vh'}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <OrdersTableHead
                        setSelectedFilters={setSelectedFilters}
                        selectedFilters={selectedFilters}
                    />
                    {!isLoading && <OrdersTableBody allOrders={allOrders}/>}
                </Table>
                {!isLoading && allOrders.length === 0 && (
                    <EmptyResponse text={'no orders by filter'}/>
                )}
                {!isMobile && isLoading && (
                    <Box sx={{pt: '7%'}}>
                        <CustomLoader height='100%'/>
                    </Box>
                )}
            </TableContainer>
        )
    }, [isMobile, isLoading, setSelectedFilters, selectedFilters, allOrders])

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAllOrders();
    }, [fetchAllOrders]);

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
        <div className="flex justify-center items-center">
            {renderOrders}
        </div>
    );

}

export default Orders