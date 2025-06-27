import React, {useCallback, useEffect, useState} from 'react'
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {acceptOrder, completeExecutionOrder, getOrdersByBooster} from "src/services/orderApi.js";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import ErrorPage, {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";
import OrdersTableBody from "src/layouts/boosters/ordersByBooster/utils/ui/OrdersTableBody.jsx";
import OrdersTableHead from "src/layouts/boosters/ordersByBooster/utils/ui/OrdersTableHead.jsx";
import OrdersLoader from "src/layouts/boosters/utils/ui/OrdersLoader.jsx";
import {toast} from "react-toastify";
import OrderInfoModal from "src/layouts/boosters/ordersByBooster/utils/ui/OrderInfoModal.jsx";

const Orders = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
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

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null);
    };

    const handleCompleteExecution = async () => {
        try {
            await completeExecutionOrder(selectedOrder.orderId);
            toast.success('The order has been successfully submitted for verification')
        } catch (error) {
            toast.error(error.response.data.message);
        }
        await fetchAllOrders()
        closeModal();
    }

    const fetchAllOrders = useCallback(async () => {
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
        fetchAllOrders();
    }, [fetchAllOrders]);

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
        <div className="flex justify-center items-center">
            <TableContainer
                className={(loading || allOrders.length === 0) ? ('bg-background max-w-[100vw] min-h-[100vh]') : ('bg-background max-w-[100vw]')}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <OrdersTableHead setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}/>
                    {!loading && (
                        <OrdersTableBody allOrders={allOrders} openModal={openModal}/>
                    )}
                </Table>
                {loading && (
                    <OrdersLoader/>
                )}
                {!loading && allOrders.length === 0 && (
                    <EmptyResponse text={'no orders by filter'}/>
                )}
            </TableContainer>
            {modalIsOpen && (
                <OrderInfoModal isOpen={modalIsOpen} onClose={closeModal}
                                onComplete={handleCompleteExecution} selectedOrder={selectedOrder}
                />
            )}
        </div>
    );

}

export default Orders