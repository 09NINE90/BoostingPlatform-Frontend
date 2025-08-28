import Badge from "@mui/material/Badge";
import {Box, IconButton, useMediaQuery} from "@mui/material";
import CartIcon from "src/assets/icons/CartIcon.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {getCartItemsApi} from "src/services/offerApi.js";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import CartModal from "src/components/cart/CartModal.jsx";
import {selectAuth, selectCountCartItems} from "src/store/slice/authSlice.js";
import {useSelector} from "react-redux";
import DropCart from "src/components/cart/DropCart.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const Cart = ({cartCount}) => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    const isAuth = useSelector(selectAuth);
    const reduxCount = useSelector(selectCountCartItems);
    const [countItems, setCountItems] = useState(reduxCount);
    const [cartItems, setCartItems] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartItems = useCallback(async () => {
        setLoading(true);
        try {
            const cartItemsApi = await getCartItemsApi();
            setCartItems(cartItemsApi);
            setLoading(false);
            setError(null)
        } catch (err) {
            setCartItems([])
            setError(handleApiError(err).status)
        } finally {
            setLoading(false);
        }
    }, [setAnchorEl, setLoading]);

    const handleCartClick = useCallback(async (event) => {
        setAnchorEl(event.currentTarget);
        await fetchCartItems();
    }, [fetchCartItems]);

    const handleCartMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const handleRemoveItem = (itemId) => {
        setCartItems((prev) => prev.filter(item => item.id !== itemId));
    };

    const handleRemoveOrderedItems = (orderedIds) => {
        setCartItems((prev) => prev.filter(item => !orderedIds.includes(item.id)));
    };

    useEffect(() => {
        setCountItems(reduxCount);
    }, [reduxCount]);

    return (
        <>
            {isAuth && (
                <div className="md:px-4 hover:scale-103">
                    <Badge badgeContent={cartCount}>
                        <IconButton onClick={handleCartClick} disableRipple
                                    sx={{
                                        transition: 'box-shadow 0.3s ease',
                                        borderRadius: 0,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: '0px 5px 10px 2px rgba(253, 152, 11, 0.2)',
                                        }
                                    }}>
                            <CartIcon count={countItems}/>
                        </IconButton>
                        <DropCart content={
                            <>
                                {error === 401 && (
                                    <EmptyResponse text={'Log in to view the shopping cart'}/>
                                )}
                                {loading && !error && (
                                    <Box sx={{minHeight: '100%', pt: '10%'}}>
                                        <CustomLoader size={0.5} height='100%'/>
                                    </Box>
                                )}
                                {!loading && !error && (
                                    <CartModal
                                        cartItems={cartItems}
                                        onRemoveItem={handleRemoveItem}
                                        onOrderComplete={handleRemoveOrderedItems}
                                        isMobileDrawer={isMobile}
                                    />
                                )}
                            </>}
                                  anchorEl={anchorEl}
                                  handleClose={handleCartMenuClose}
                        />
                    </Badge>
                </div>
            )}
        </>
    )
}

export default Cart;