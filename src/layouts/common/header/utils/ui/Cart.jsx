import Badge from "@mui/material/Badge";
import {IconButton} from "@mui/material";
import CartIcon from "src/assets/icons/CartIcon.jsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {getCartItemsApi} from "src/services/offerApi.jsx";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import CartModal from "src/components/cart/CartModal.jsx";
import {PacmanLoader} from "react-spinners";
import {selectCountCartItems} from "src/store/slice/authSlice.js";
import {useSelector} from "react-redux";


const Cart = ({cartCount}) => {

    const reduxCount = useSelector(selectCountCartItems);
    const [countItems, setCountItems] = useState(reduxCount);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setCountItems(reduxCount);
    }, [reduxCount]);

    const fetchCartItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const cartItemsApi = await getCartItemsApi();
            setCartItems(cartItemsApi);
        } catch (err) {
            setCartItems([])
            console.error(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleModal = useCallback(async () => {
        if (!modalIsOpen) {
            await fetchCartItems();
        }
        setModalIsOpen(prev => !prev);
    }, [modalIsOpen, fetchCartItems]);

    const handleCartClick = useMemo(() => {
        return (
            <ModalTemplate
                isOpen={modalIsOpen}
                onClose={toggleModal}
                title="Cart"
                content={isLoading ? (
                    <PacmanLoader size={40}/>
                ) : (
                    <CartModal cartItems={cartItems}/>
                )}
            />
        )
    }, [modalIsOpen, toggleModal]);

    return (
        <>
            <div className="px-4 hover:scale-103">
                <Badge badgeContent={cartCount}>
                    <IconButton onClick={toggleModal}>
                        <CartIcon count={countItems}/>
                    </IconButton>
                </Badge>
            </div>
            {handleCartClick}
        </>

    )
}

export default Cart;