import TableCell from "@mui/material/TableCell";
import SortButton from "src/layouts/boosters/dashboard/utils/ui/SortButton.jsx";
import {
    BOOSTER_PRICE,
    GAME_NAME,
    GAME_PLATFORM,
    OFFER_NAME
} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import FilterDropdown from "src/layouts/boosters/dashboard/utils/ui/FilterDropdown.jsx";
import PriceFilter from "src/layouts/boosters/dashboard/utils/ui/PriceFilter.jsx";
import TableHead from "@mui/material/TableHead";
import React, {useCallback, useEffect, useState} from "react";
import {getFiltersForOrdersByBooster} from "src/services/orderApi.js";

const OrdersTableHead = ({selectedFilters, setSelectedFilters}) => {

    const [openFilter, setOpenFilter] = useState(null);
    const [filters, setFilters] = useState({
        statuses: [],
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getFiltersForOrdersByBooster()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getFiltersForOrdersByBooster, setFilters]);

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
            gameNames: value
        }));
    }, []);

    const handleGamePlatformSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            gamePlatforms: value
        }));
    }, []);

    const handleOrderStatusSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            statuses: value
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
        fetchOrdersFilterData();
    }, [fetchOrdersFilterData]);

    return (
        <TableHead>
            <TableCell sx={{width: '35%'}}>
                <div className='text-text-primary kanit-regular text-xl'>
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
                        <FilterIcon isActive={selectedFilters.gameNames.length > 0}/>
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
                        selected={selectedFilters.gameNames}
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
                        <FilterIcon isActive={selectedFilters.gamePlatforms.length > 0}/>
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
                        selected={selectedFilters.gamePlatforms}
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
                            isActive={selectedFilters.price.priceFrom !== null && selectedFilters.price.priceTo !== null}/>
                    </button>
                    <SortButton
                        sortKey={BOOSTER_PRICE}
                        currentSort={selectedFilters.sort}
                        onSort={handleSort}
                    />
                </div>
                {openFilter === 'price' && (
                    <PriceFilter
                        onApply={handlePriceApply}
                        currentPrice={selectedFilters.price}
                        priceByFilter={filters.price}
                        onClose={() => setOpenFilter(null)}
                    />
                )}
            </TableCell>
            <TableCell align="center" sx={{width: '10%'}}>
                <div className='text-text-primary flex justify-center items-center kanit-regular text-xl'>
                    Status
                    <button onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
                            className="ml-2">
                        <FilterIcon isActive={selectedFilters.status !== null}/>
                    </button>
                </div>
                {openFilter === 'status' && (
                    <FilterDropdown
                        title="Select platform"
                        options={filters.statuses}
                        selected={selectedFilters.statuses}
                        onSelect={handleOrderStatusSelect}
                        onClose={() => setOpenFilter(null)}
                    />
                )}
            </TableCell>
            <TableCell align="center" sx={{width: '10%'}}>
                <div className='text-text-primary kanit-regular text-xl'>Action</div>
            </TableCell>
        </TableHead>
    )
}

export default OrdersTableHead;