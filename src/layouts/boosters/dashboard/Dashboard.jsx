import React, {useCallback, useEffect} from 'react'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button} from '@mui/material';

import {useState} from 'react';
import {getAllOrder, getOrderFilters} from "src/services/orderApi.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import FilterDropdown from "src/layouts/boosters/dashboard/utils/ui/FilterDropdown.jsx";
import PriceFilter from "src/layouts/boosters/dashboard/utils/ui/PriceFilter.jsx";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import {GAME_NAME, GAME_PLATFORM, OFFER_NAME, PRICE} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import SortButton from "src/layouts/boosters/dashboard/utils/ui/SortButton.jsx";
import OrderPagination from "src/layouts/boosters/dashboard/utils/ui/OrderPagination.jsx";
import AcceptModal from "src/layouts/boosters/dashboard/utils/ui/AcceptModal.jsx";


const Dashboard = () => {
    const employeesPerPage = 5;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedUUID, setSelectedUUID] = useState(null);
    const [allOrders, setAllOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [recordTotal, setRecordTotal] = useState(employeesPerPage);
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
        price: {
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
            const allOrdersApi = await getAllOrder(selectedFilters)
            setAllOrders(allOrdersApi.orders);
            setTotalPages(allOrdersApi.pageTotal);
            setRecordTotal(allOrdersApi.recordTotal)
        } catch (error) {
            setAllOrders([]);
            console.log(error);
        }
    }, [getAllOrder, setAllOrders, selectedFilters]);

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getOrderFilters()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getOrderFilters, setFilters]);

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
            price: {
                priceFrom: priceFrom,
                priceTo: priceTo
            }
        }));
    }, []);

    const openModal = (uuid) => {
        setSelectedUUID(uuid);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUUID(null);
    };

    const handleAccept = () => {
        console.log(`get order with uuid: ${selectedUUID} in work `);
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
                                <TableCell>
                                    <div className='text-[#fff]'>
                                        Available Orders
                                        <SortButton
                                            sortKey={OFFER_NAME}
                                            currentSort={selectedFilters.sort}
                                            onSort={handleSort}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='text-[#fff] flex items-center'>
                                        Game
                                        <button onClick={() => setOpenFilter(openFilter === 'game' ? null : 'game')}
                                                className="ml-2">
                                            <FilterIcon/>
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
                                            onSelect={handleGameSelect}
                                            onClose={() => setOpenFilter(null)}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <div className='text-[#fff] flex justify-center items-center'>
                                        Platform
                                        <button
                                            onClick={() => setOpenFilter(openFilter === 'platform' ? null : 'platform')}
                                            className="ml-2">
                                            <FilterIcon/>
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
                                            onSelect={handleGamePlatformSelect}
                                            onClose={() => setOpenFilter(null)}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <div className='text-[#fff] flex justify-center items-center'>
                                        Price
                                        <button onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                                                className="ml-2">
                                            <FilterIcon/>
                                        </button>
                                        <SortButton
                                            sortKey={PRICE}
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
                                <TableCell align="center">
                                    <div className='text-[#fff]'>Action</div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders.map((order) => (
                                <TableRow

                                    key={order.orderId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}, p: 2}}
                                >
                                    <TableCell component="th" scope="row">
                                        <div className='text-[#fff]'>
                                            {order.offerName} # {order.secondId}
                                            <OrderOptions order={order}/>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='text-[#fff]'>{order.gameName}</div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className='text-[#fff]'>{order.gamePlatform}</div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className='text-[#fff]'>${order.totalPrice}</div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => openModal(order.orderId)}
                                        >
                                            Accept
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AcceptModal isOpen={modalIsOpen} onClose={closeModal} onAccept={handleAccept}/>
                {allOrders.length < recordTotal && (
                    <OrderPagination changePage={changePage} currentPage={pageNumber} totalPages={totalPages}/>
                )}
            </div>
        </>
    );
}

export default Dashboard