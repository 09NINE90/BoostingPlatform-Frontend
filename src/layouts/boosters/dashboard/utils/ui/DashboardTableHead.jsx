import TableCell from "@mui/material/TableCell";
import SortButton from "src/layouts/boosters/dashboard/utils/ui/SortButton.jsx";
import {GAME_NAME, GAME_PLATFORM, OFFER_NAME, TOTAL_PRICE} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import FilterDropdown from "src/layouts/boosters/dashboard/utils/ui/FilterDropdown.jsx";
import PriceFilter from "src/layouts/boosters/dashboard/utils/ui/PriceFilter.jsx";
import TableHead from "@mui/material/TableHead";
import React, {useCallback, useEffect, useState} from "react";
import {getFiltersDashboard} from "src/services/orderApi.js";
import theme from "src/theme/theme.jsx";
import TableRow from "@mui/material/TableRow";

const DashboardTableHead = ({setPageNumber, setSelectedFilters, selectedFilters}) => {

    const [openFilter, setOpenFilter] = useState(null);
    const [filters, setFilters] = useState({
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getFiltersDashboard()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getFiltersDashboard, setFilters]);

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
            gameNames: value
        }));
    }, []);

    const handleGamePlatformSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            gamePlatforms: value
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
        <TableHead
            sx={{
                borderBottom: `2px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.default,
            }}>
            <TableRow>
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
                                isActive={selectedFilters.totalPrice.priceFrom !== null || selectedFilters.totalPrice.priceTo !== null}/>
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
                            currentPrice={selectedFilters.totalPrice}
                            priceByFilter={filters.price}
                            onClose={() => setOpenFilter(null)}
                        />
                    )}
                </TableCell>
                <TableCell align="center" sx={{width: '20%'}}>
                    <div className='text-text-primary kanit-regular text-xl'>Action</div>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default DashboardTableHead;