import React, {useState, useCallback, useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {TextField} from "@mui/material";

const PriceFilter = ({onApply, priceByFilter, onClose, currentPrice}) => {
    const minBound = priceByFilter.priceMin || 0;
    const maxBound = priceByFilter.priceMax || 100;

    const initialMin = currentPrice?.priceFrom || minBound;
    const initialMax = currentPrice?.priceTo || maxBound;

    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);
    const [sliderValues, setSliderValues] = useState([initialMin, initialMax]);

    useEffect(() => {
        const newMin = currentPrice?.priceFrom || minBound;
        const newMax = currentPrice?.priceTo || maxBound;
        setMinValue(newMin);
        setMaxValue(newMax);
        setSliderValues([newMin, newMax]);
    }, [currentPrice, minBound, maxBound]);

    const handleSliderChange = (event, newValue) => {
        setSliderValues(newValue);
        setMinValue(newValue[0]);
        setMaxValue(newValue[1]);
    };

    const handleMinInputChange = (e) => {
        const value = Math.min(Math.max(Number(e.target.value), minBound), maxValue - 1);
        setMinValue(value);
        setSliderValues([value, maxValue]);
    };

    const handleMaxInputChange = (e) => {
        const value = Math.max(Math.min(Number(e.target.value), maxBound), minValue + 1);
        setMaxValue(value);
        setSliderValues([minValue, value]);
    };

    const handleApply = useCallback(() => {
        onApply({
            priceFrom: minValue !== minBound ? minValue : null,
            priceTo: maxValue !== maxBound ? maxValue : null
        });
        onClose();
    }, [minValue, maxValue, minBound, maxBound, onApply, onClose]);

    const handleClear = useCallback(() => {
        setMinValue(minBound);
        setMaxValue(maxBound);
        setSliderValues([minBound, maxBound]);
        onApply({priceFrom: null, priceTo: null});
        onClose();
    }, [minBound, maxBound, onApply, onClose]);

    return (
        <div className="absolute z-100 bg-background text-text-primary border border-gray-600 p-4 shadow-md mt-2 w-64">
            <div className="font-bold mb-4 kanit-medium">Price Range</div>

            <Box sx={{width: '100%', mb: 4}}>
                <Slider
                    value={sliderValues}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={minBound}
                    max={maxBound}
                />
            </Box>

            <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-2">
                    <label className="block text-sm mb-1 kanit-light">From</label>
                    <TextField
                        type="number"
                        value={minValue}
                        onChange={handleMinInputChange}
                        className="bg-background border border-gray-600 px-2 py-1 rounded w-full kanit-light"
                        min={minBound}
                        max={maxValue - 1}
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 40,
                            },
                            '& .MuiInputBase-input': {
                                py: 0.5,
                            },
                        }}
                    />
                </div>
                <div className="flex-1 ml-2">
                    <label className="block text-sm mb-1 kanit-light">To</label>
                    <TextField
                        type="number"
                        value={maxValue}
                        onChange={handleMaxInputChange}
                        min={minValue + 1}
                        max={maxBound}
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 40,
                            },
                            '& .MuiInputBase-input': {
                                py: 0.5,
                            },
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between mt-2 border-t pt-2">
                <button
                    onClick={handleClear}
                    className="text-red-400 hover:bg-[#3A3455] px-2 py-1 text-sm kanit-light"
                >
                    ✕ Cancel
                </button>
                <button
                    onClick={handleApply}
                    className="text-green-400 hover:bg-[#3A3455] px-2 py-1 text-sm kanit-light"
                >
                    ✓ Apply
                </button>
            </div>
        </div>
    );
};

export default PriceFilter;