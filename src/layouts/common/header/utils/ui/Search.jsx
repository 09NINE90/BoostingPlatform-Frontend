import SearchIcon from "src/assets/icons/SearchIcon.jsx";

const Search = () => {
    return (
        <div className="relative w-[25vw]">
            <input
                id="search_field"
                type="text"
                placeholder="Find an offer"
                className="w-full bg-conic-900 text-[#00A0FF]/80 placeholder-[#004772]/80 border-b border-[#00A0FF] focus:outline-none focus:border-b-2 focus:border-[#00A0FF] hover:border-b-2 pl-10 py-2 kanit-light"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-105">
                <SearchIcon/>
            </div>
        </div>
    )
}

export default Search;