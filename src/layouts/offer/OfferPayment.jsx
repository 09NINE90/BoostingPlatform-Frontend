import React, {useState, useMemo, useCallback} from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    FormControlLabel,
    Slider,
    Divider,
    Box,
    Button
} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {postOffersToCart} from "src/services/offerApi.js";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectCountCartItems, setCountCartItems} from "src/store/slice/authSlice.js";
import {store} from "src/store/store.js";
import {toast} from "react-toastify";

const OfferPayment = ({offerData, optionsBlocks, gamePlatforms, setModalIsOpen}) => {

    const isAuth = useSelector(selectAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [basePrice] = useState(200);
    const [baseTime] = useState(8);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedPlatform, setSelectedPlatform] = useState(gamePlatforms[0]?.title);
    const dispatch = useDispatch();

    const handleChange = (blockId, value, label, optionTitle) => {
        setSelectedOptions((prev) => {
            return {
                ...prev,
                [blockId]: {
                    value: value,
                    label: label,
                    optionTitle: optionTitle
                }
            };
        });
    };

    const { totalPrice, totalTime } = useMemo(() => {
        let price = basePrice;
        let time = baseTime;
        let totalPercentChange = 0;

        const processOptions = (blocks) => {
            blocks.forEach((block) => {
                if (block.items) {
                    block.items.forEach((item) => {
                        const isSelected =
                            block.type === "CHECKBOX"
                                ? selectedOptions[block.id]?.value?.includes(item.value) // для checkbox
                                : selectedOptions[block.id]?.value === item.value; // для select сюда еще надо будет бахнуть выбор ранга

                        if (isSelected) {
                            price += item.priceChange || 0;
                            time += item.timeChange || 0;

                            if (item.percentChange) {
                                totalPercentChange += item.percentChange;
                            }

                            if (item.subOptions) {
                                processOptions(item.subOptions);
                            }
                        }
                    });
                }

                if (block.type === "SLIDER" && selectedOptions[block.id]) {
                    price += (selectedOptions[block.id].value - block.min) * block.sliderPriceChange;
                }

                if (block.type === "SLIDER_INVERT" && selectedOptions[block.id]) {
                    price -= (selectedOptions[block.id].value - block.min) * block.sliderPriceChange;
                }
            });
        };

        processOptions(optionsBlocks);

        if (totalPercentChange !== 0) {
            price += (price * totalPercentChange) / 100;
        }

        return { totalPrice: price, totalTime: time };
    }, [selectedOptions, basePrice, baseTime, optionsBlocks]);

    const handleAddToCart = useCallback(async () => {
        if (!isAuth) {
            setModalIsOpen(true);
            return;
        }
        const cartItem = {
            offerId: offerData.offerId,
            basePrice: basePrice,
            gameName: offerData.gameName,
            gameId: offerData.gameId,
            gamePlatform: selectedPlatform,
            selectedOptions: Object.entries(selectedOptions).map(([optionId, optionData]) => ({
                optionId,
                value: optionData.value,
                label: optionData.label,
                optionTitle: optionData.optionTitle
            })),
            totalPrice: totalPrice,
            totalTime: totalTime
        };

        setIsLoading(true)
        try {
            await postOffersToCart(cartItem);
            const currentCount = selectCountCartItems(store.getState());
            dispatch(setCountCartItems(currentCount + 1));
            toast.success('Successfully added to cart')
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false)
        }
    }, [offerData, basePrice, selectedOptions, totalPrice, totalTime, selectedPlatform]);


    const renderOption = useCallback((option) => {
        const selected = selectedOptions[option.id];

        const handleSliderChange = (_, value) =>
            handleChange(option.id, value, value, option.title);

        return (
            <div key={option.id} className="mb-5">
                <h3 className="mb-2 font-semibold">{option.title}</h3>

                {option.type === "SELECT" && (
                    <FormControl fullWidth>
                        <InputLabel color="secondary">{option.title}</InputLabel>
                        <Select
                            value={selected?.value || ""}
                            onChange={(e) => {
                                const selectedItem = option.items.find(item => item.value === e.target.value);
                                handleChange(option.id, e.target.value, selectedItem.label, option.title);
                            }}
                            color="secondary"
                        >
                            {option.items.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {option.type === "CHECKBOX" && (
                    <div>
                        {option.items.map((item) => (
                            <FormControlLabel
                                key={item.value}
                                control={
                                    <Checkbox
                                        checked={selected?.value?.includes(item.value) || false}
                                        color="primary"
                                        onChange={(e) => {
                                            const currentValues = selected?.value || [];
                                            const currentLabels = selected?.label || [];

                                            const [newValues, newLabels] = e.target.checked
                                                ? [[...currentValues, item.value], [...currentLabels, item.label]]
                                                : [
                                                    currentValues.filter(v => v !== item.value),
                                                    currentLabels.filter((_, i) => currentValues[i] !== item.value)
                                                ];

                                            handleChange(option.id, newValues, newLabels, option.title);
                                        }}
                                    />
                                }
                                label={item.label}
                            />
                        ))}
                    </div>
                )}

                {option.type === "BUTTONS" && (
                    <Box>
                        {option.items.map((item) => (
                            <Button
                                sx={{ m: 1 }}
                                key={item.value}
                                variant={selected?.value === item.value ? "contained" : "outlined"}
                                onClick={() => handleChange(option.id, item.value, item.label, option.title)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {(option.type === "SLIDER" || option.type === "SLIDER_INVERT") && (
                    <Slider
                        marks
                        valueLabelDisplay="auto"
                        value={selected?.value || option.min}
                        min={option.min}
                        max={option.max}
                        step={option.step}
                        onChange={handleSliderChange}
                        aria-labelledby="slider"
                        color="primary"
                    />
                )}
            </div>
        );
    }, [selectedOptions, handleChange]);

    const renderOptions = useMemo(() => {
        const run = (acc, remainingBlocks) => {
            if (remainingBlocks.length === 0) return acc;

            const block = remainingBlocks[0];
            acc.push(renderOption(block));

            if (block.items) {
                block.items.forEach((item) => {
                    const isSelected = block.type === "CHECKBOX"
                        ? selectedOptions[block.id]?.value?.includes(item.value)
                        : selectedOptions[block.id]?.value === item.value;

                    if (item.subOptions && isSelected) {
                        run(acc, item.subOptions);
                    }
                });
            }

            return run(acc, remainingBlocks.slice(1));
        };

        return run([], optionsBlocks);
    }, [optionsBlocks, selectedOptions, renderOption]);

    return (
        <div className="min-w-[300px] md:max-w-[400px] bg-background-paper">
            <div className="relative z-0">
                <img
                    src={offerData.imageUrl}
                    alt="background"
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 h-[calc(100%)] bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />
            </div>
            <div className="relative -mt-40 z-20 p-5 text-white rounded-xl">
                {renderOptions}
                <Box>
                    Choose platform:
                    {gamePlatforms.map((item) => (
                        <Button
                            sx={{ m: 1 }}
                            key={item.id}
                            variant={selectedPlatform === item.title ? "contained" : "outlined"}
                            onClick={() => setSelectedPlatform(item.title)}
                        >
                            {item.title}
                        </Button>
                    ))}
                </Box>
                <Divider />
                <div className="flex flex-col">
                    <div className="my-5">
                        <h3 className="font-bold">Total Price: ${totalPrice.toFixed(2)}</h3>
                        <h3 className="font-bold">Estimated Time: {totalTime} hours</h3>
                    </div>
                    <Button
                        loading={isLoading}
                        variant="contained"
                        startIcon={<ShoppingCartOutlinedIcon />}
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OfferPayment;
