import {Box, Button, Checkbox, Collapse, Divider, FormControlLabel, Slider, Typography} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import {getFiltersForOrdersByBooster} from "src/services/orderApi.js";
import theme from "src/theme/theme.jsx";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";
import MobileSortFilter from "src/layouts/boosters/ordersByBooster/utils/ui/MobileSortFilter.jsx";

const MobileFilters = ({selectedFilters, setSelectedFilters}) => {
    const [expanded, setExpanded] = useState(false);

    const [filters, setFilters] = useState({
        statuses: [],
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });

    const [tempFilters, setTempFilters] = useState(selectedFilters);

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getFiltersForOrdersByBooster()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getFiltersForOrdersByBooster, setFilters]);

    useEffect(() => {
        fetchOrdersFilterData();
    }, [fetchOrdersFilterData]);

    const handleCheckboxChange = (key, value) => {
        setTempFilters((prev) => ({
            ...prev,
            [key]: prev[key]?.includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...(prev[key] || []), value],
        }));
    };

    const handlePriceChange = (event, newValue) => {
        setTempFilters((prev) => ({
            ...prev,
            price: {
                priceFrom: newValue[0],
                priceTo: newValue[1],
            },
        }));
    };

    const handleApply = () => {
        setSelectedFilters(tempFilters);
        setExpanded(false);
    };

    const handleCancel = () => {
        setTempFilters(selectedFilters);
        setExpanded(false);
    };

    const handleSelectAll = () => {
        setTempFilters({
            gameNames: [...filters.gameNames],
            gamePlatforms: [...filters.gamePlatforms],
            statuses: [...filters.statuses],
            price: {
                priceFrom: filters.price.priceMin,
                priceTo: filters.price.priceMax
            },
            sort: tempFilters.sort ?? null
        });
    };

    const handleClearAll = () => {
        setTempFilters({
            gameNames: [],
            gamePlatforms: [],
            statuses: [],
            price: {
                priceFrom: filters.price.priceMin,
                priceTo: filters.price.priceMax
            },
            sort: null
        });
    };

    const handleSort = (key) => {
        setTempFilters((prev) => {
            if (prev.sort?.key === key) {
                const newDirection = prev.sort.asc === false ? null : !prev.sort.asc;
                return {
                    ...prev,
                    sort: newDirection !== null ? { key, asc: newDirection } : null,
                };
            }
            return {
                ...prev,
                sort: { key, asc: true },
            };
        });
    };

    const renderCheckboxGroup = (title, key, options) => (
        <Box sx={{mb: 2}}>
            <Typography variant="subtitle1"
                        sx={{
                            fontWeight: theme.typography.fontWeightLight,
                        }}>
                {title}
            </Typography>
            {options.map((opt) => (
                <FormControlLabel
                    key={opt}
                    control={
                        <Checkbox
                            checked={tempFilters[key]?.includes(opt) || false}
                            onChange={() => handleCheckboxChange(key, opt)}
                            sx={{
                                '& + .MuiFormControlLabel-label': {
                                    fontWeight: theme.typography.fontWeightLight,
                                },
                            }}
                        />
                    }
                    label={opt}
                />
            ))}
        </Box>
    );

    const minBound = filters.price.priceMin ?? 0;
    const maxBound = filters.price.priceMax ?? 10000;
    const priceFrom = tempFilters.price?.priceFrom ?? minBound;
    const priceTo = tempFilters.price?.priceTo ?? maxBound;

    return (
        <Box sx={{mb: 2}}>
            <OutlinedBlueButton
                onClick={() => setExpanded(!expanded)}
                sx={{
                    width: '100%',
                }}
            >
                Filters
            </OutlinedBlueButton>

            <Collapse in={expanded}>
                <Box sx={{mt: 2, p: 2, backgroundColor: 'background.paper',}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                        <Button onClick={handleSelectAll} size="small"
                                sx={{
                                    fontSize: 14,
                                    color: theme.palette.primary.main
                                }}>
                            Select all
                        </Button>
                        <Button onClick={handleClearAll} size="small"
                                sx={{
                                    fontSize: 14,
                                    color: theme.palette.statuses.red
                                }}>
                            Clear all
                        </Button>
                    </Box>
                    {renderCheckboxGroup('Games', 'gameNames', filters.gameNames)}
                    {renderCheckboxGroup('Platforms', 'gamePlatforms', filters.gamePlatforms)}
                    {renderCheckboxGroup('Statuses', 'statuses', filters.statuses)}

                    <Divider sx={{my: 2}}/>

                    <Typography variant="subtitle1"
                                sx={{
                                    fontWeight: theme.typography.fontWeightLight,
                                }}>
                        Price Range
                    </Typography>
                    <Slider
                        value={[priceFrom ?? minBound, priceTo ?? maxBound]}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={minBound}
                        max={maxBound}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightLight }}>
                        Sort by
                    </Typography>

                    <MobileSortFilter handleSort={handleSort} tempFilters={tempFilters}/>

                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                        <Button onClick={handleCancel} sx={{color: theme.palette.statuses.red}}>
                            ✕ Cancel
                        </Button>
                        <Button onClick={handleApply} sx={{color: theme.palette.statuses.completed}}>
                            ✓ Apply
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
};

export default MobileFilters;