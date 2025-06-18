import React, {useCallback, useEffect} from 'react'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button} from '@mui/material';

import {useState} from 'react';
import {acceptOrder, getAllOrders, getFiltersForCreatedOrders} from "src/services/orderApi.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import FilterDropdown from "src/layouts/boosters/dashboard/utils/ui/FilterDropdown.jsx";
import PriceFilter from "src/layouts/boosters/dashboard/utils/ui/PriceFilter.jsx";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import {
    GAME_NAME,
    GAME_PLATFORM,
    OFFER_NAME,
    TOTAL_PRICE
} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import SortButton from "src/layouts/boosters/dashboard/utils/ui/SortButton.jsx";
import OrderPagination from "src/layouts/boosters/dashboard/utils/ui/OrderPagination.jsx";
import AcceptModal from "src/layouts/boosters/dashboard/utils/ui/AcceptModal.jsx";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";


const Dashboard = () => {
    const employeesPerPage = 300;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [allOrders, setAllOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [recordTotal, setRecordTotal] = useState(employeesPerPage);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        statuses: [],
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });
    const [selectedFilters, setSelectedFilters] = useState({
        status: null,
        gameName: null,
        gamePlatform: null,
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
            const allOrdersApi = await getAllOrders(selectedFilters)
            setAllOrders(allOrdersApi.orders);
            setTotalPages(allOrdersApi.pageTotal);
            setRecordTotal(allOrdersApi.recordTotal);
            setLoading(false);
        } catch (error) {
            setAllOrders([]);
            console.log(error);
        }
    }, [getAllOrders, setAllOrders, selectedFilters]);

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getFiltersForCreatedOrders()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getFiltersForCreatedOrders, setFilters]);

    const handleSort = (sortKey) => {
        setPageNumber(0)
        setSelectedFilters(prev => {
            if (prev.sort?.key === sortKey) {
                const newDirection = prev.sort.asc === false ? null : !prev.sort.asc;
                return {
                    ...prev,
                    sort: newDirection !== null
                        ? {key: sortKey, asc: newDirection}
                        : null,
                    pageNumber: 1
                };
            }

            return {
                ...prev,
                sort: {key: sortKey, asc: true},
                pageNumber: 1
            };
        });
    };

    const handleGameSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            gameName: value
        }));
    }, []);

    const handleGamePlatformSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            gamePlatform: value
        }));
    }, []);

    const handlePriceApply = useCallback(({priceFrom, priceTo}) => {
        setSelectedFilters((prev) => ({
            ...prev,
            totalPrice: {
                priceFrom: priceFrom,
                priceTo: priceTo
            }
        }));
    }, []);

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

    const changePage = useCallback(({selected}) => {
        setPageNumber(selected);
        setSelectedFilters(prev => ({
            ...prev,
            pageNumber: selected + 1
        }));
    }, []);

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    useEffect(() => {
        fetchOrdersFilterData();
    }, [fetchOrdersFilterData]);

    return (
        <>
            <div className="flex justify-center items-center">
                <TableContainer className='bg-[#1E1930] m-3 max-w-[90vw]'>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '35%' }}>
                                    <div className='text-[#fff] kanit-regular text-xl'>
                                        Available Orders
                                        <SortButton
                                            sortKey={OFFER_NAME}
                                            currentSort={selectedFilters.sort}
                                            onSort={handleSort}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell sx={{ width: '15%' }}>
                                    <div className='text-[#fff] flex items-center kanit-regular text-xl'>
                                        Game
                                        <button onClick={() => setOpenFilter(openFilter === 'game' ? null : 'game')}
                                                className="ml-2">
                                            <FilterIcon isActive={selectedFilters.gameName !== null} />
                                        </button>
                                        <SortButton
                                            sortKey={GAME_NAME}
                                            currentSort={selectedFilters.sort}
                                            onSort={handleSort}
                                        />
                                    </div>
                                    {openFilter === 'game' && (
                                        <FilterDropdown
                                            title="Select Game"
                                            options={filters.gameNames}
                                            selected={selectedFilters.gameName}
                                            onSelect={handleGameSelect}
                                            onClose={() => setOpenFilter(null)}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ width: '15%' }}>
                                    <div className='text-[#fff] flex justify-center items-center kanit-regular text-xl'>
                                        Platform
                                        <button
                                            onClick={() => setOpenFilter(openFilter === 'platform' ? null : 'platform')}
                                            className="ml-2">
                                            <FilterIcon isActive={selectedFilters.gamePlatform !== null} />
                                        </button>
                                        <SortButton
                                            sortKey={GAME_PLATFORM}
                                            currentSort={selectedFilters.sort}
                                            onSort={handleSort}
                                        />
                                    </div>
                                    {openFilter === 'platform' && (
                                        <FilterDropdown
                                            title="Select platform"
                                            options={filters.gamePlatforms}
                                            selected={selectedFilters.gamePlatform}
                                            onSelect={handleGamePlatformSelect}
                                            onClose={() => setOpenFilter(null)}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ width: '15%' }}>
                                    <div className='text-[#fff] flex justify-center items-center kanit-regular text-xl'>
                                        Price
                                        <button onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                                                className="ml-2">
                                            <FilterIcon isActive={selectedFilters.totalPrice.priceFrom !== null && selectedFilters.totalPrice.priceTo !== null} />
                                        </button>
                                        <SortButton
                                            sortKey={TOTAL_PRICE}
                                            currentSort={selectedFilters.sort}
                                            onSort={handleSort}
                                        />
                                    </div>
                                    {openFilter === 'price' && (
                                        <PriceFilter
                                            onApply={handlePriceApply}
                                            currentPrice={selectedFilters.price}
                                            onClose={() => setOpenFilter(null)}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ width: '20%' }}>
                                    <div className='text-[#fff] kanit-regular text-xl'>Action</div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {!loading && (
                            <TableBody>
                                {allOrders.map((order) => (
                                    <TableRow
                                        key={order.orderId}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}, p: 2}}
                                    >
                                        <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                                            <div className='text-[#fff] kanit-light'>
                                                {order.offerName} # {order.secondId}
                                                <OrderOptions order={order}/>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ width: '15%' }}>
                                            <div className='text-[#fff] kanit-light'>{order.gameName}</div>
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: '15%' }}>
                                            <div className='text-[#fff] kanit-light'>{order.gamePlatform}</div>
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: '15%' }}>
                                            <div className='text-[#fff] kanit-light'>${order.totalPrice}</div>
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: '20%' }}>
                                            <Button
                                                onClick={() => openModal(order)}
                                            >
                                                Accept
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                    {loading && (
                        <div className="flex justify-center items-center min-h-[80vh]">
                            <div className="mt-[30vh]">
                                <ClipLoader
                                    color="#FD980B"
                                    size={100}
                                    cssOverride={{display: "block", margin: "auto auto"}}
                                />
                            </div>
                        </div>
                    )}
                </TableContainer>
                <AcceptModal isOpen={modalIsOpen} onClose={closeModal} onAccept={handleAccept}
                             selectedOrder={selectedOrder}/>
                {allOrders.length < recordTotal && (
                    <OrderPagination changePage={changePage} currentPage={pageNumber} totalPages={totalPages}/>
                )}
            </div>
        </>
    );
}

export default Dashboard