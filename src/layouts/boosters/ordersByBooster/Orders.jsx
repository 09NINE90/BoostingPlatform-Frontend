import React, {useCallback, useEffect, useState} from 'react'
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SortButton from "src/layouts/boosters/dashboard/utils/ui/SortButton.jsx";
import {GAME_NAME, GAME_PLATFORM, OFFER_NAME, PRICE} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import FilterDropdown from "src/layouts/boosters/dashboard/utils/ui/FilterDropdown.jsx";
import PriceFilter from "src/layouts/boosters/dashboard/utils/ui/PriceFilter.jsx";
import TableBody from "@mui/material/TableBody";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import {Button} from "@mui/material";
import {ClipLoader} from "react-spinners";
import {getOrderFilters, getOrdersByBooster} from "src/services/orderApi.js";
import {
    IN_PROGRESS,
    ordersStatuses,
    ordersStatusesMap
} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";

const Orders = () => {
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        statuses: [],
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });
    const [selectedFilters, setSelectedFilters] = useState({
        status: IN_PROGRESS,
        gameName: null,
        gamePlatform: null,
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
        try {
            setLoading(true);
            const allOrdersApi = await getOrdersByBooster(selectedFilters)
            setAllOrders(allOrdersApi   );
            setLoading(false);
        } catch (error) {
            setAllOrders([]);
            console.log(error);
        }
    }, [getOrdersByBooster, setAllOrders, selectedFilters]);

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getOrderFilters()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getOrderFilters, setFilters]);

    const handleSort = (sortKey) => {
        setSelectedFilters(prev => {
            if (prev.sort?.key === sortKey) {
                const newDirection = prev.sort.asc === false ? null : !prev.sort.asc;
                return {
                    ...prev,
                    sort: newDirection !== null
                        ? {key: sortKey, asc: newDirection}
                        : null,
                };
            }

            return {
                ...prev,
                sort: {key: sortKey, asc: true},
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

    const handleOrderStatusSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            status: value
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


    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    useEffect(() => {
        fetchOrdersFilterData();
    }, [fetchOrdersFilterData]);


    return (
        <div className="flex justify-center items-center">
            <TableContainer className='bg-[#1E1930] m-3 max-w-[90vw]'>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '35%'}}>
                                <div className='text-[#fff] kanit-regular text-xl'>
                                    Available Orders
                                    <SortButton
                                        sortKey={OFFER_NAME}
                                        currentSort={selectedFilters.sort}
                                        onSort={handleSort}
                                    />
                                </div>
                            </TableCell>
                            <TableCell sx={{width: '15%'}}>
                                <div className='text-[#fff] flex items-center kanit-regular text-xl'>
                                    Game
                                    <button onClick={() => setOpenFilter(openFilter === 'game' ? null : 'game')}
                                            className="ml-2">
                                        <FilterIcon isActive={selectedFilters.gameName !== null}/>
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
                            <TableCell align="center" sx={{width: '15%'}}>
                                <div className='text-[#fff] flex justify-center items-center kanit-regular text-xl'>
                                    Platform
                                    <button
                                        onClick={() => setOpenFilter(openFilter === 'platform' ? null : 'platform')}
                                        className="ml-2">
                                        <FilterIcon isActive={selectedFilters.gamePlatform !== null}/>
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
                            <TableCell align="center" sx={{width: '15%'}}>
                                <div className='text-[#fff] flex justify-center items-center kanit-regular text-xl'>
                                    Price
                                    <button onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                                            className="ml-2">
                                        <FilterIcon
                                            isActive={selectedFilters.price.priceFrom !== null && selectedFilters.price.priceTo !== null}/>
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
                            <TableCell align="center" sx={{width: '10%'}}>
                                <div className='text-[#fff] flex justify-center items-center kanit-regular text-xl'>
                                    Status
                                    <button onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
                                            className="ml-2">
                                        <FilterIcon isActive={selectedFilters.status !== null}/>
                                    </button>
                                </div>
                                {openFilter === 'status' && (
                                    <FilterDropdown
                                        title="Select platform"
                                        options={ordersStatuses}
                                        selected={selectedFilters.status}
                                        onSelect={handleOrderStatusSelect}
                                        onClose={() => setOpenFilter(null)}
                                    />
                                )}
                            </TableCell>
                            <TableCell align="center" sx={{width: '10%'}}>
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
                                    <TableCell component="th" scope="row" sx={{width: '35%'}}>
                                        <div className='text-[#fff] kanit-light'>
                                            {order.offerName} # {order.secondId}
                                            <OrderOptions order={order}/>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{width: '15%'}}>
                                        <div className='text-[#fff] kanit-light'>{order.gameName}</div>
                                    </TableCell>
                                    <TableCell align="center" sx={{width: '15%'}}>
                                        <div className='text-[#fff] kanit-light'>{order.gamePlatform}</div>
                                    </TableCell>
                                    <TableCell align="center" sx={{width: '15%'}}>
                                        <div className='text-[#fff] kanit-light'>${order.totalPrice}</div>
                                    </TableCell>
                                    <TableCell align="center" sx={{width: '10%'}}>
                                        <div className='text-[#fff] kanit-light'>{ordersStatusesMap.get(order.orderStatus)}</div>
                                    </TableCell>
                                    <TableCell align="center" sx={{width: '10%'}}>
                                        <Button>
                                            GET INFO
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
        </div>
    );

}

export default Orders