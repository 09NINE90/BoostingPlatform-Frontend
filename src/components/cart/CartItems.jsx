const CartItems = ({item}) => {
    return (
        <div key={item.offerId} className="flex flex-col mb-6 p-4 bg-[#110134] border-2 border-[#2a206a]">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl text-[#00A0FF] kanit-medium text-left">Offer: {item.offerName}</h3>
                    <h3 className="text-l text-white kanit-medium text-left">Game: {item.gameName}</h3>
                    <div className="mt-1 text-[#00A0FF] text-left">
                        Time: {item.totalTime} hours
                    </div>
                </div>
                <div className="mt-0">
                    <h4 className="text-m text-gray-400 mb-1 text-left kanit-light">Additional options:</h4>
                    <ul className="space-y-2">
                        {item.selectedOptions.map((option, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-[#00A0FF] rounded-full"></span>
                                <div className="flex">
                                    <div className="text-white kanit-light">{option.optionTitle}:</div>
                                    <div className="text-gray-300 ml-2 kanit-light">{option.label}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="text-2xl text-white kanit-light">
                        $ {item.totalPrice}
                    </div>
                    <button className="w-full bg-[#d93636] hover:bg-[#a82828] text-white kanit-light transition-colors p-2 mt-6">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItems;