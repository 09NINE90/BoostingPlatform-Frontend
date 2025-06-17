const FilterDropdown = ({title, options = [], onSelect, onClose, selected}) => {
    return (
        <div className="absolute z-100 bg-[#2A2545] text-white border border-gray-600 p-2 rounded shadow-md mt-2 w-48">
            <div className="font-bold mb-2">{title}</div>
            <ul className="space-y-1 text-left">
                {options.map((opt) => (
                    <li
                        key={opt}
                        onClick={() => {
                            onSelect(opt);
                            onClose();
                        }}
                        className={`cursor-pointer kanit-light hover:bg-[#3A3455] px-1 py-1.5 border-l-1 ${
                            selected === opt ? 'text-[#FD980B] font-medium' : ''
                        }`}
                    >
                        {opt}
                    </li>
                ))}
                <li
                    onClick={() => {
                        onSelect(null);
                        onClose();
                    }}
                    className="cursor-pointer text-red-400 hover:bg-[#3A3455] px-1 py-1 border-t-1"
                >
                    ✕ Clear Filter
                </li>
            </ul>
        </div>
    );
};


export default FilterDropdown;