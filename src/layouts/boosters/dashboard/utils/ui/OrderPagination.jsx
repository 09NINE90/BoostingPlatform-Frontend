import React from "react";
import {Box, TablePagination} from "@mui/material";
import theme from "src/theme/theme.jsx";

const OrderPagination = ({recordTotal, employeesPerPage, pageNumber, handlePageChange, handleRowsPerPageChange}) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme.palette.background.default,
                borderTop: `1px solid ${theme.palette.divider}`,
            }}>
            <Box
                sx={{
                    maxWidth: '100vw',
                    mx: 'auto'
                }}>
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100, 300, 500]}
                    component="div"
                    count={recordTotal}
                    rowsPerPage={employeesPerPage}
                    page={pageNumber}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    className="bg-background text-text-primary"
                    classes={{
                        root: "text-text-primary",
                        selectIcon: "text-text-primary",
                        actions: "text-text-primary",
                    }}
                    sx={{
                        color: 'text-primary',
                        backgroundColor: theme.palette.background.default,
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            color: 'text-primary'
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'text-primary'
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default OrderPagination;