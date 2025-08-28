import { useState } from 'react';

const FilterDropdown = ({
                            title,
                            options = [],
                            onSelect,
                            onClose,
                            selected = [],
                        }) => {
    const [tempSelected, setTempSelected] = useState([...selected]);

    const handleToggleOption = (opt) => {
        setTempSelected(prev =>
            prev.includes(opt)
                ? prev.filter(item => item !== opt)
                : [...prev, opt]
        );
    };

    const handleSelectAll = () => {
        setTempSelected([...options]);
    };

    const handleClearAll = () => {
        setTempSelected([]);
    };

    const handleApply = () => {
        onSelect(tempSelected);
        onClose();
    };

    return (
        <div className="absolute z-100 bg-background text-text-primary border border-gray-600 p-2 shadow-md mt-2 w-48 opacity-100">
            <div className="mb-2 kanit-medium">{title}</div>

            <div className="flex justify-between mb-2">
                <button
                    onClick={handleSelectAll}
                    className="text-xs text-blue-400 hover:underline kanit-light"
                >
                    Select all
                </button>
                <button
                    onClick={handleClearAll}
                    className="text-xs text-red-400 hover:underline kanit-light"
                >
                    Clear all
                </button>
            </div>

            <ul className="space-y-1 text-left max-h-60 overflow-y-auto">
                {options.map((opt) => (
                    <li
                        key={opt}
                        className="flex items-center cursor-pointer hover:bg-[#3A3455] px-1 py-1.5"
                        onClick={() => handleToggleOption(opt)}
                    >
                        <input
                            type="checkbox"
                            checked={tempSelected.includes(opt)}
                            onChange={() => {}}
                            className="mr-2 cursor-pointer"
                        />
                        <span className={tempSelected.includes(opt) ? 'text-primary kanit-light' : 'kanit-light'}>
              {opt}
            </span>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between mt-2 border-t pt-2">
                <button
                    onClick={() => {
                        onSelect([]);
                        onClose();
                    }}
                    className="text-red-400 hover:bg-[#3A3455] px-2 py-1 text-sm kanit-light"
                >
                    ✕ Cancel
                </button>
                <button
                    onClick={handleApply}
                    className="text-green-400 hover:bg-[#3A3455] px-2 py-1 text-sm kanit-light"
                >
                    ✓ Apply
                </button>
            </div>
        </div>
    );
};

export default FilterDropdown;