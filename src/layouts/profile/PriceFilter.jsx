import {useCallback, useState} from "react";

const PriceFilter = ({onApply, currentPrice, onClose}) => {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const handleApply = useCallback(() => {
        onApply({priceFrom: +min, priceTo: +max});
        onClose();
    }, [min, max, onApply, onClose]);

    const handleClear = useCallback(() => {
        onApply({priceFrom: null, priceTo: null});
        onClose();
    }, [min, max, onApply, onClose]);

    return (
        <div className="absolute z-100 bg-[#2A2545] text-white border border-gray-600 p-2 rounded shadow-md mt-2">
            <div className="font-bold mb-2">Price Range</div>
            <input
                type="number"
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="bg-[#1E1930] border border-gray-600 px-2 py-1 rounded mb-2 w-full"
            />
            <input
                type="number"
                placeholder="Max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="bg-[#1E1930] border border-gray-600 px-2 py-1 rounded mb-2 w-full"
            />
            <button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full mb-2"
            >
                Apply
            </button>
            <button
                onClick={handleClear}
                className="bg-gray-500 hover:bg-blue-700 text-white px-3 py-1 rounded w-full"
            >
                Clear
            </button>
        </div>
    );
};

export default PriceFilter;