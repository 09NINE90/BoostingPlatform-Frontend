import ReactPaginate from "react-paginate";
import React from "react";

const OfferPagination = ({totalPages, changePage, currentPage }) => {
    return (
        <div className="py-6">
            <ReactPaginate
                forcePage={currentPage}
                previousLabel={null}
                nextLabel={null}
                pageCount={totalPages}
                onPageChange={changePage}
                containerClassName="flex justify-center items-center gap-1 kanit-bold list-none"
                pageLinkClassName="flex items-center justify-center w-10 h-10 border border-[#004772] text-[#004772] cursor-pointer hover:border-white hover:text-white transition-colors duration-200"
                activeLinkClassName="border-white text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                breakLabel="..."
                breakClassName="text-[#004772] px-2"
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
            />
        </div>
    )
}

export default OfferPagination;