import React, {useCallback, useEffect, useState} from 'react'
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
    const [loading, setLoading] = useState(true);
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
            setLoading(true);
            const allOrdersApi = await getOrdersByBooster(selectedFilters)
            setAllOrders(allOrdersApi);
        } catch (err) {
            setAllOrders([]);
            setError(handleApiError(err))
        } finally {
            setLoading(false);
        }
    }, [getOrdersByBooster, setAllOrders, selectedFilters]);

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
            {isMobile ? (
                <OrdersMobileView
                    orders={allOrders}
                    loading={loading}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
            ) : (
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <OrdersTableHead
                            setSelectedFilters={setSelectedFilters}
                            selectedFilters={selectedFilters}
                        />
                        {!loading && <OrdersTableBody allOrders={allOrders}/>}
                    </Table>
                    {!loading && allOrders.length === 0 && (
                        <EmptyResponse text={'no orders by filter'}/>
                    )}
                    {loading && (
                        <Box sx={{ pt: '7%' }}>
                            <CustomLoader height='100%'/>
                        </Box>
                    )}
                </TableContainer>
            )}
        </div>
    );

}

export default Orders