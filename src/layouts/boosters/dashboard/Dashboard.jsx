import React, {useCallback, useEffect, useMemo} from 'react'
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
import {Box, useMediaQuery} from "@mui/material";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import DashboardMobileView from "src/layouts/boosters/dashboard/utils/ui/DashboardMobileView.jsx";

const Dashboard = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [allOrders, setAllOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [employeesPerPage, setEmployeesPerPage] = useState(isMobile ? 20 : 500);
    const [recordTotal, setRecordTotal] = useState(0);
    const [acceptLoading, setAcceptLoading] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
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
        setAllOrders([]);
        setIsLoading(true);
        try {
            const allOrdersApi = await getDashboardOrders(selectedFilters)
            setAllOrders(allOrdersApi.orders);
            setTotalPages(allOrdersApi.pageTotal);
            setRecordTotal(allOrdersApi.recordTotal);
        } catch (err) {
            setAllOrders([]);
            setError(handleApiError(err))
        } finally {
            setIsLoading(false);
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
        setAcceptLoading(true);
        try {
            await acceptOrder(selectedOrder.orderId);
            await fetchAllOrders()
            toast.success('The order has been successfully completed')
            closeModal();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setAcceptLoading(false);
        }
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

    const renderDashboard = useMemo(() => {
        if(isMobile) {
            return (
                <DashboardMobileView
                    setSelectedFilters={setSelectedFilters}
                    selectedFilters={selectedFilters}
                    setPageNumber={setPageNumber}
                    allOrders={allOrders}
                    openModal={openModal}
                    loading={isLoading}
                />
            )
        }

        return (
            <TableContainer
                className={(isLoading || allOrders.length === 0)
                    ? 'bg-background max-w-[100vw] min-h-[calc(100vh-64px)]'
                    : 'bg-background max-w-[100vw] pb-16'
                }
            >
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <DashboardTableHead setPageNumber={setPageNumber}
                                        setSelectedFilters={setSelectedFilters}
                                        selectedFilters={selectedFilters}
                    />
                    {!isLoading && (
                        <DashboardTableBody allOrders={allOrders} openModal={openModal}/>
                    )}
                </Table>
                {!isMobile && isLoading && (
                    <Box sx={{pt: '7%'}}>
                        <CustomLoader height='100%'/>
                    </Box>
                )}
                {!isLoading && allOrders.length === 0 && (
                    <EmptyResponse text={'no orders by filter'}/>
                )}
            </TableContainer>
        )
    }, [isMobile, isLoading, allOrders, setSelectedFilters, selectedFilters])

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
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow relative">
                {renderDashboard}
            </div>
            <OrderPagination employeesPerPage={employeesPerPage}
                             recordTotal={recordTotal}
                             pageNumber={pageNumber}
                             handlePageChange={handlePageChange}
                             handleRowsPerPageChange={handleRowsPerPageChange}
            />
            {modalIsOpen && (
                <AcceptModal isOpen={modalIsOpen} onClose={closeModal} onAccept={handleAccept}
                             selectedOrder={selectedOrder} isLoading={acceptLoading}/>
            )}
        </div>
    );
}

export default Dashboard