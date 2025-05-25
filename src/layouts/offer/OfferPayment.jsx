import React, {useState, useEffect} from "react";
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
import {postOffersToCart} from "src/services/offerApi.jsx";

const OfferPayment = ({offerData, optionsBlocks}) => {
    const [basePrice, setBasePrice] = useState(200);
    const [baseTime, setBaseTime] = useState(8);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalTime, setTotalTime] = useState(0);


    useEffect(() => {
        calculateTotals();

    }, [selectedOptions]);

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

    const calculateTotals = () => {
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

        setTotalPrice(price);
        setTotalTime(time);
    };

    const handleAddToCart = () => {
        const cartItem = {
            offerId: offerData.offerId,
            basePrice: basePrice,
            gameName: offerData.gameName,
            selectedOptions: Object.entries(selectedOptions).map(([optionId, optionData]) => {
                return {
                    optionId,
                    value: optionData.value,
                    label: optionData.label,
                    optionTitle: optionData.optionTitle
                };
            }),
            totalPrice: totalPrice,
            totalTime: totalTime
        };

        // Отправка в API или сохранение в контекст/сторе
        // console.log('Adding to cart:', cartItem);
        postOffersToCart(cartItem).then(r => console.log('Successfully added to cart!', r));
        // Пример с использованием контекста:
        // addToCart(cartItem);

        // Или отправка на бэкенд:
        // fetch('/api/cart/add', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(cartItem)
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         // Обработка успешного добавления
        //     })
        //     .catch(error => {
        //         // Обработка ошибки
        //     });
    };


    const renderOption = (option) => {
        return (
            <div key={option.id} className="mb-5">
                <h3 className="mb-2 font-semibold">{option.title}</h3>

                {option.type === "SELECT" && (
                    <FormControl fullWidth>
                        <InputLabel color="secondary">{option.title}</InputLabel>
                        <Select
                            value={selectedOptions[option.id]?.value || ""}
                            onChange={(e) =>
                            {
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
                                        checked={selectedOptions[option.id]?.value?.includes(item.value) || false}
                                        color="secondary"
                                        onChange={(e) => {
                                            const currentValues = selectedOptions[option.id]?.value || [];
                                            const currentLabels = selectedOptions[option.id]?.label || [];

                                            let newValues, newLabels;

                                            if (e.target.checked) {
                                                newValues = [...currentValues, item.value];
                                                newLabels = [...currentLabels, item.label];
                                            } else {
                                                newValues = currentValues.filter(v => v !== item.value);
                                                newLabels = currentLabels.filter((_, i) => currentValues[i] !== item.value);
                                            }

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
                                sx={{m: 1}}
                                key={item.value}
                                variant={selectedOptions[option.id]?.value === item.value ? "contained" : "outlined"}
                                onClick={() => handleChange(option.id, item.value, item.label, option.title)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {option.type === "SLIDER" && (
                    <Slider
                        marks
                        valueLabelDisplay="auto"
                        value={selectedOptions[option.id]?.value || option.min}
                        min={option.min}
                        max={option.max}
                        getAriaValueText={(value) => value}
                        step={option.step}
                        onChange={(_, value) => handleChange(option.id, value, value, option.title)}
                        aria-labelledby="slider"
                        color="secondary"
                    />
                )}

                {option.type === "SLIDER_INVERT" && (
                    <Slider
                        marks
                        valueLabelDisplay="auto"
                        value={selectedOptions[option.id]?.value || option.min}
                        min={option.min}
                        max={option.max}
                        getAriaValueText={(value) => value}
                        step={option.step}
                        onChange={(_, value) => handleChange(option.id, value, value, option.title)}
                        aria-labelledby="slider"
                        color="secondary"
                    />
                )}
            </div>
        );
    }


    const renderOptions = (optionsBlocks) => {
        const run = (acc, remainingBlocks) => {
            if (remainingBlocks.length === 0) {
                return acc;
            }

            const block = remainingBlocks[0];
            acc.push(renderOption(block));

            if (block.items) {
                block.items.forEach((item) => {
                    const isSelected = block.type === "CHECKBOX"
                        ? selectedOptions[block.id]?.value?.includes(item.value)
                        : selectedOptions[block.id]?.value === item.value;
                    if (item.subOptions && item.subOptions.length !== 0 && isSelected) {
                        run(acc, item.subOptions);
                    }
                });
            }


            return run(acc, remainingBlocks.slice(1));
        };

        return run([], optionsBlocks);
    };

    return (
        <div className="m-2 mt-7 min-w-[300px] max-w-[400px] rounded-xl bg-surface">
            <div className="relative z-0">
                <img
                    src="https://overgear.com/cdn-cgi/image/width=360,quality=85,format=auto/cdn/uploads/2de1aabf7251e876e2b4f9583fcfcac8.jpeg"
                    alt="background"
                    className="w-full h-full object-cover opacity-100 rounded-xl"
                />
                <div
                    className="absolute inset-0 h-[calc(100%)] bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"/>
            </div>
            <div className=" relative -mt-40 z-20 p-5 text-white rounded-xl">
                {renderOptions(optionsBlocks)}
                <Divider/>
                <div className="flex flex-col">
                    <div className="my-5">
                        <h3 className="font-bold">Total Price: ${totalPrice.toFixed(2)}</h3>
                        <h3 className="font-bold">Estimated Time: {totalTime} hours</h3>
                    </div>
                    <Button variant="contained"
                            startIcon={<ShoppingCartOutlinedIcon/>}
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
