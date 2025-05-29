import CartItems from "src/components/cart/CartItems.jsx";
import CartPayment from "src/components/cart/CartPayment.jsx";

const CartModal = ({cartItems}) => {
    return (
        <div className="flex h-full">
            <div className="flex-1 overflow-y-auto max-h-[60vh] pr-3 custom-scrollbar">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItems item={item}/>
                    ))
                ) : (
                    <div className="flex justify-center text-center text-gray-400 py-8">
                        Your cart is empty.
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <CartPayment cartItems={cartItems}/>
            )}
        </div>
    );
};
export default CartModal;