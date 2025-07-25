import theme from "src/theme/theme.jsx";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Collapse,
    Slider,
    Button,
    Divider
} from '@mui/material'
import {useState, useEffect, useCallback} from 'react'
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";
import MobileSortFilter from "src/layouts/utils/ui/MobileSortFilter.jsx";
import {
    GAME_NAME,
    GAME_PLATFORM,
    TOTAL_PRICE
} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import {getFiltersDashboard} from "src/services/orderApi.js";


const DashboardMobileFilters = ({setPageNumber, selectedFilters, setSelectedFilters}) => {
    const [expanded, setExpanded] = useState(false);
    const dashboardSortKeys =[TOTAL_PRICE, GAME_NAME, GAME_PLATFORM];

    const [filters, setFilters] = useState({
        gamePlatforms: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    })

    const [tempFilters, setTempFilters] = useState(selectedFilters)

    const fetchDashboardFilters = useCallback(async () => {
        try {
            const response = await getFiltersDashboard()
            setFilters(response)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchDashboardFilters()
    }, [fetchDashboardFilters])

    const handleCheckboxChange = (key, value) => {
        setTempFilters((prev) => ({
            ...prev,
            [key]: prev[key]?.includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...(prev[key] || []), value],
        }))
    }

    const handlePriceChange = (event, newValue) => {
        setTempFilters((prev) => ({
            ...prev,
            totalPrice: {
                priceFrom: newValue[0],
                priceTo: newValue[1],
            }
        }))
    }

    const handleApply = () => {
        setSelectedFilters(tempFilters)
        setExpanded(false)
    }

    const handleCancel = () => {
        setTempFilters(selectedFilters)
        setExpanded(false)
    }

    const handleSelectAll = () => {
        setTempFilters({
            gameNames: [...filters.gameNames],
            gamePlatforms: [...filters.gamePlatforms],
            totalPrice: {
                priceFrom: filters.price.priceMin,
                priceTo: filters.price.priceMax
            },
            sort: tempFilters.sort ?? null
        })
    }

    const handleClearAll = () => {
        setTempFilters({
            gameNames: [],
            gamePlatforms: [],
            totalPrice: {
                priceFrom: null,
                priceTo: null
            },
            sort: null
        })
    }

    const handleSort = (key) => {
        setPageNumber(0)
        setTempFilters((prev) => {
            if (prev.sort?.key === key) {
                const newDirection = prev.sort.asc === false ? null : !prev.sort.asc
                return {
                    ...prev,
                    sort: newDirection !== null ? {key, asc: newDirection} : null,
                }
            }
            return {
                ...prev,
                sort: {key, asc: true},
                pageNumber: 1
            }
        })
    }

    const renderCheckboxGroup = (title, key, options) => (
        <Box sx={{mb: 2}}>
            <Typography variant="subtitle1" sx={{fontWeight: theme.typography.fontWeightLight}}>
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
    )

    const minBound = filters.price.priceMin ?? 0
    const maxBound = filters.price.priceMax ?? 10000
    const priceFrom = tempFilters.totalPrice?.priceFrom ?? minBound
    const priceTo = tempFilters.totalPrice?.priceTo ?? maxBound

    return (
        <Box sx={{mb: 2}}>
            <OutlinedBlueButton onClick={() => setExpanded(!expanded)} sx={{width: '100%'}}>
                Filters
            </OutlinedBlueButton>

            <Collapse in={expanded}>
                <Box sx={{mt: 2, p: 2, backgroundColor: 'background.paper'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                        <Button onClick={handleSelectAll} size="small"
                                sx={{fontSize: 14, color: theme.palette.primary.main}}>
                            Select all
                        </Button>
                        <Button onClick={handleClearAll} size="small"
                                sx={{fontSize: 14, color: theme.palette.statuses.red}}>
                            Clear all
                        </Button>
                    </Box>

                    {renderCheckboxGroup('Games', 'gameNames', filters.gameNames)}
                    {renderCheckboxGroup('Platforms', 'gamePlatforms', filters.gamePlatforms)}

                    <Divider sx={{my: 2}}/>

                    <Typography variant="subtitle1" sx={{fontWeight: theme.typography.fontWeightLight}}>
                        Price Range
                    </Typography>
                    <Slider
                        value={[priceFrom, priceTo]}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={minBound}
                        max={maxBound}
                    />

                    <Divider sx={{my: 2}}/>

                    <Typography variant="subtitle1" sx={{fontWeight: theme.typography.fontWeightLight}}>
                        Sort by
                    </Typography>

                    <MobileSortFilter
                        sortKeys={dashboardSortKeys}
                        handleSort={handleSort}
                        tempFilters={tempFilters}
                    />

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
    )
}

export default DashboardMobileFilters;
