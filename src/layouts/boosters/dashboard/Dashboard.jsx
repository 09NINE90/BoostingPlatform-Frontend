import React, {useCallback, useEffect} from 'react'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';

import {useState} from 'react';
import {acceptOrder, getDashboardOrders} from "src/services/orderApi.js";
import AcceptModal from "src/layouts/boosters/dashboard/utils/ui/AcceptModal.jsx";
import {toast} from "react-toastify";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OrderPagination from "src/layouts/boosters/dashboard/utils/ui/OrderPagination.jsx";
import DashboardTableBody from "src/layouts/boosters/dashboard/utils/ui/DashboardTableBody.jsx";
import DashboardTableHead from "src/layouts/boosters/dashboard/utils/ui/DashboardTableHead.jsx";
import OrdersLoader from "src/layouts/boosters/utils/ui/OrdersLoader.jsx";

const Dashboard = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [allOrders, setAllOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [employeesPerPage, setEmployeesPerPage] = useState(500);
    const [recordTotal, setRecordTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        gameNames: [],
        gamePlatforms: [],
        totalPrice: {
            priceFrom: null,
            priceTo: null
        },
        sort: {
            key: null,
            asc: false
        },
        pageNumber: pageNumber + 1,
        pageSize: employeesPerPage
    });

    const fetchAllOrders = useCallback(async () => {
        try {
            setLoading(true);
            const allOrdersApi = await getDashboardOrders(selectedFilters)
            setAllOrders(allOrdersApi.orders);
            setTotalPages(allOrdersApi.pageTotal);
            setRecordTotal(allOrdersApi.recordTotal);
        } catch (err) {
            setAllOrders([]);
            setError(handleApiError(err))
        } finally {
            setLoading(false);
        }

    }, [getDashboardOrders, setAllOrders, selectedFilters]);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null);
    };

    const handleAccept = async () => {
        try {
            await acceptOrder(selectedOrder.orderId);
            toast.success('The order has been successfully completed')
        } catch (error) {
            toast.error(error.response.data.message);
        }
        await fetchAllOrders()
        closeModal();
    }

    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
        setSelectedFilters(prev => ({
            ...prev,
            pageNumber: newPage + 1
        }));
    };

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setEmployeesPerPage(newRowsPerPage);
        setPageNumber(0);
        setSelectedFilters(prev => ({
            ...prev,
            pageNumber: 1,
            pageSize: newRowsPerPage
        }));
    };

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow relative">
                <TableContainer
                    className={(loading || allOrders.length === 0)
                        ? 'bg-background max-w-[100vw] min-h-[calc(100vh-64px)]'
                        : 'bg-background max-w-[100vw] pb-16'
                    }
                >
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <DashboardTableHead setPageNumber={setPageNumber}
                                            setSelectedFilters={setSelectedFilters}
                                            selectedFilters={selectedFilters}
                        />
                        {!loading && (
                            <DashboardTableBody allOrders={allOrders} openModal={openModal}/>
                        )}
                    </Table>
                    {loading && (
                        <OrdersLoader/>
                    )}
                    {!loading && allOrders.length === 0 && (
                        <EmptyResponse text={'no orders by filter'}/>
                    )}
                </TableContainer>
            </div>
            <OrderPagination employeesPerPage={employeesPerPage}
                             recordTotal={recordTotal}
                             pageNumber={pageNumber}
                             handlePageChange={handlePageChange}
                             handleRowsPerPageChange={handleRowsPerPageChange}
            />
            {modalIsOpen && (
                <AcceptModal isOpen={modalIsOpen} onClose={closeModal} onAccept={handleAccept}
                             selectedOrder={selectedOrder}/>
            )}
        </div>
    );
}

export default Dashboard