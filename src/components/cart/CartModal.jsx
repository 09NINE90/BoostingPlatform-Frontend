import CartItems from "src/components/cart/CartItems.jsx";
import CartPayment from "src/components/cart/CartPayment.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import React, {useState} from "react";
import {postCreateOrders} from "src/services/orderApi.js";
import {selectCountCartItems, setCountCartItems} from "src/store/slice/authSlice.js";
import {useDispatch, useSelector} from "react-redux";

const CartModal = ({cartItems, onRemoveItem, onOrderComplete}) => {

    const dispatch = useDispatch();
    const countCartItems = useSelector(selectCountCartItems);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleToggleItem = (item) => {
        setSelectedIds((prev) =>
            prev.includes(item.id)
                ? prev.filter((id) => id !== item.id)
                : [...prev, item.id]
        );
    };

    const handleProceed = async () => {
        try {
            await postCreateOrders(selectedIds);
            dispatch(setCountCartItems(countCartItems - selectedIds.length));
            onOrderComplete(selectedIds);
            setSelectedIds([]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex h-[40vh]">
            <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItems
                            key={item.id}
                            item={item}
                            isSelected={selectedIds.includes(item.id)}
                            onToggle={handleToggleItem}
                            onRemoveItem={onRemoveItem}
                        />
                    ))
                ) : (
                    <EmptyResponse text={'Your cart is empty.'} minHeight={'100%'}/>
                )}
            </div>

            {cartItems.length > 0 && (
                <CartPayment
                    cartItems={cartItems.filter((item) => selectedIds.includes(item.id))}
                    onProceed={handleProceed}
                />
            )}
        </div>
    );
};
export default CartModal;