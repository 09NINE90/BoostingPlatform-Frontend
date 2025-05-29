import Badge from "@mui/material/Badge";
import {IconButton} from "@mui/material";
import CartIcon from "src/assets/icons/CartIcon.jsx";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";


const Cart = ({cartCount}) => {

    const navigate = useNavigate();

    const handleCartClick = useCallback(() => {
        navigate("/cart");
    }, [navigate]);

    return (
        <div className="px-4 hover:scale-103">
            <Badge badgeContent={cartCount}>
                <IconButton onClick={handleCartClick}>
                    <CartIcon/>
                </IconButton>
            </Badge>
        </div>
    )
}

export default Cart;