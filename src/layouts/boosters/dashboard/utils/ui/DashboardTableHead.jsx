import TableCell from "@mui/material/TableCell";
import SortButton from "src/layouts/boosters/dashboard/utils/ui/SortButton.jsx";
import {GAME_NAME, GAME_PLATFORM, OFFER_NAME, TOTAL_PRICE} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import FilterDropdown from "src/layouts/boosters/dashboard/utils/ui/FilterDropdown.jsx";
import PriceFilter from "src/layouts/boosters/dashboard/utils/ui/PriceFilter.jsx";
import TableHead from "@mui/material/TableHead";
import React, {useCallback, useEffect, useState} from "react";
import {getFiltersForCreatedOrders} from "src/services/orderApi.js";

const DashboardTableHead = ({setPageNumber, setSelectedFilters, selectedFilters}) => {

    const [openFilter, setOpenFilter] = useState(null);
    const [filters, setFilters] = useState({
        statuses: [],
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });

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

    useEffect(() => {
        fetchOrdersFilterData();
    }, [fetchOrdersFilterData]);


    return (
        <TableHead>
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
                <div className='text-text-primary flex items-center kanit-regular text-xl'>
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
                <div className='text-text-primary flex justify-center items-center kanit-regular text-xl'>
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
                <div className='text-text-primary flex justify-center items-center kanit-regular text-xl'>
                    Price
                    <button onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                            className="ml-2">
                        <FilterIcon
                            isActive={selectedFilters.totalPrice.priceFrom !== null && selectedFilters.totalPrice.priceTo !== null}/>
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
            <TableCell align="center" sx={{width: '20%'}}>
                <div className='text-text-primary kanit-regular text-xl'>Action</div>
            </TableCell>
        </TableHead>
    )
}

export default DashboardTableHead;