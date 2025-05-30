import Badge from "@mui/material/Badge";
import {IconButton} from "@mui/material";
import CartIcon from "src/assets/icons/CartIcon.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {getCartItemsApi} from "src/services/offerApi.jsx";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import CartModal from "src/components/cart/CartModal.jsx";
import {ClipLoader} from "react-spinners";
import {selectCountCartItems} from "src/store/slice/authSlice.js";
import {useSelector} from "react-redux";
import DropCart from "src/components/cart/DropCart.jsx";


const Cart = ({cartCount}) => {

    const reduxCount = useSelector(selectCountCartItems);
    const [countItems, setCountItems] = useState(reduxCount);
    const [cartItems, setCartItems] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = useCallback(async () => {
        try {
            const cartItemsApi = await getCartItemsApi();
            setCartItems(cartItemsApi);
            setLoading(false);
        } catch (err) {
            setCartItems([])
            console.error(handleApiError(err));
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
            <div className="px-4 hover:scale-103">
                <Badge badgeContent={cartCount}>
                    <IconButton onClick={handleCartClick}>
                        <CartIcon count={countItems}/>
                    </IconButton>
                    <DropCart content={<>
                        {loading && (
                            <div className="flex justify-center items-center mx-auto mt-[12vh] min-h-[20vw] min-w-[40vw]">
                                <ClipLoader color="#FD980B" size={50}
                                            cssOverride={{display: "block", margin: "auto auto"}}/>
                            </div>)}
                        {!loading && (<CartModal cartItems={cartItems}/>)}
                    </>}
                              anchorEl={anchorEl}
                              handleClose={handleCartMenuClose}
                    />
                </Badge>
            </div>
        </>

    )
}

export default Cart;