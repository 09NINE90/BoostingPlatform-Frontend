import CartItems from "src/components/cart/CartItems.jsx";
import CartPayment from "src/components/cart/CartPayment.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import React, {useState} from "react";
import {postCreateOrders} from "src/services/orderApi.js";
import {selectCountCartItems, setCountCartItems} from "src/store/slice/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import theme from "src/theme/theme.jsx";

const CartModal = ({cartItems, onRemoveItem, onOrderComplete, isMobileDrawer = false }) => {

    const dispatch = useDispatch();
    const countCartItems = useSelector(selectCountCartItems);
    const [selectedIds, setSelectedIds] = useState(cartItems.map(item => item.id));
    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = async () => {
        setIsLoading(true)
        try {
            await postCreateOrders(selectedIds);
            dispatch(setCountCartItems(countCartItems - selectedIds.length));
            onOrderComplete(selectedIds);
            setSelectedIds([]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    };

    if (isMobileDrawer) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100% - 56px)',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    maxHeight: '50%',
                    mb: 2,
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.grey[400],
                        borderRadius: '2px',
                    }
                }}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItems
                                key={item.id}
                                item={item}
                                onRemoveItem={onRemoveItem}
                                isMobile={true}
                            />
                        ))
                    ) : (
                        <EmptyResponse text={'Your cart is empty.'} minHeight={'50vh'} />
                    )}
                </Box>

                {cartItems.length > 0 && (
                    <CartPayment
                        cartItems={cartItems}
                        onProceed={handleProceed}
                        loading={isLoading}
                        isMobile={true}
                    />
                )}
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '40vh',
            '& .custom-scrollbar': {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'grey.400',
                    borderRadius: '3px'
                }
            }
        }}>
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                pr: 3,
                className: 'custom-scrollbar'
            }}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItems
                            key={item.id}
                            item={item}
                            onRemoveItem={onRemoveItem}
                        />
                    ))
                ) : (
                    <EmptyResponse text={'Your cart is empty.'} minHeight={'100%'}/>
                )}
            </Box>

            {cartItems.length > 0 && (
                <CartPayment
                    cartItems={cartItems}
                    onProceed={handleProceed}
                    loading={isLoading}
                />
            )}
        </Box>
    );
};
export default CartModal;