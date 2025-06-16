const OrderOptions = ({order}) => {
    return (
        <>
            {order.selectedOptions.length > 0 && (
                <>
                    <h4 className="text-m text-gray-400 mb-1 text-left kanit-light mt-3">Additional options:</h4>
                    <ul className="space-y-2">
                        {order.selectedOptions.map((option, idx) => (
                            <li key={idx} className="flex items-start">
                                        <span
                                            className="inline-block w-2 h-2 mt-2 mr-2 bg-[#00A0FF] rounded-full"></span>
                                <div className="flex">
                                    <div
                                        className="text-white  text-left  text-sm kanit-light">{option.optionTitle}:
                                    </div>
                                    <div
                                        className="text-gray-300 text-left text-sm ml-2 kanit-light">{option.label}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}

export default OrderOptions;