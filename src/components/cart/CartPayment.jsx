const CartPayment = ({cartItems}) => {
    return (
        <div className="border-l border-gray-700 pl-3 min-w-[15vw]">
            <h3 className="kanit-medium text-xl">
                Total: {cartItems.length}
            </h3>
            <ul className="space-y-2 overflow-y-auto max-h-[30vh] mt-4]">
                {cartItems.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-2 mr-2 bg-[#00A0FF] rounded-full"></span>
                        <div className="flex">
                            <div className="text-white kanit-light">{item.offerName}:</div>
                            <div className="text-gray-300 ml-2 kanit-light">$ {item.totalPrice}</div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between text-xl kanit-light mb-4 mt-4">
                <span>Total price:</span>
                <span>$ {cartItems.reduce((sum, item) => sum + item.totalPrice, 0)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Total time:</span>
                <span>{cartItems.reduce((sum, item) => sum + item.totalTime, 0)} hours</span>
            </div>
            <button className="w-full bg-[#004772] hover:bg-[#00A0FF] text-white py-3 kanit-light transition-colors p-2">
                Proceed to payment
            </button>
        </div>
    )
}

export default CartPayment;