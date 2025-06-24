import ReactPaginate from "react-paginate";
import React from "react";
import {TablePagination} from "@mui/material";

const OrderPagination = ({recordTotal, employeesPerPage, pageNumber, handlePageChange, handleRowsPerPageChange}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1E1930] border-t border-gray-700 shadow-lg">
            <div className="max-w-[100vw] mx-auto">
                <TablePagination
                    rowsPerPageOptions={[50, 100, 300, 500]}
                    component="div"
                    count={recordTotal}
                    rowsPerPage={employeesPerPage}
                    page={pageNumber}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    className="bg-[#1E1930] text-text-primary"
                    classes={{
                        root: "text-text-primary",
                        selectIcon: "text-text-primary",
                        actions: "text-text-primary",
                    }}
                    sx={{
                        color: 'text-primary',
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            color: 'text-primary'
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'text-primary'
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default OrderPagination;