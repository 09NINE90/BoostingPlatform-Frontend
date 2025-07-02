import Badge from "@mui/material/Badge";
import {IconButton} from "@mui/material";
import CartIcon from "src/assets/icons/CartIcon.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {getCartItemsApi} from "src/services/offerApi.js";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import CartModal from "src/components/cart/CartModal.jsx";
import {ClipLoader} from "react-spinners";
import {selectAuth, selectCountCartItems} from "src/store/slice/authSlice.js";
import {useSelector} from "react-redux";
import DropCart from "src/components/cart/DropCart.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";


const Cart = ({cartCount}) => {

    const isAuth = useSelector(selectAuth);
    const reduxCount = useSelector(selectCountCartItems);
    const [countItems, setCountItems] = useState(reduxCount);
    const [cartItems, setCartItems] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartItems = useCallback(async () => {
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

    const handleCartClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
        fetchCartItems();
    }, [fetchCartItems]);

    const handleCartMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    useEffect(() => {
        setCountItems(reduxCount);
    }, [reduxCount]);

    return (
        <>
            {isAuth &&(
                <div className="px-4 hover:scale-103">
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
                        <DropCart content={<>
                            {error === 401 && (
                                <EmptyResponse text={'Log in to view the shopping cart'}/>
                            )}
                            {loading && !error && (
                                <div className="flex justify-center items-center mx-auto mt-[12vh] min-h-[20vw] min-w-[40vw]">
                                    <ClipLoader color="#FD980B" size={50}
                                                cssOverride={{display: "block", margin: "auto auto"}}/>
                                </div>)}
                            {!loading && !error && (<CartModal cartItems={cartItems}/>)}
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