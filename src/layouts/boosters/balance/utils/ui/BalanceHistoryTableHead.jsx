import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React from "react";
import theme from "src/theme/theme.jsx";

const BalanceHistoryTableHead = () => {

    const CustomCell = ({title, center = true, width}) => {
        return (
            <TableCell
                align={center ? "center" : "start"}
                sx={{
                    fontWeight: theme.typography.fontWeightLight,
                    width: {width}
                }}>
                {title}
            </TableCell>
        )
    }

    return (
        <TableHead
            sx={{
                backgroundColor: theme.palette.background.default,
            }}>
            <CustomCell title='Order ID' center={false} width='10%'/>
            <CustomCell title='Type' width='15%'/>
            <CustomCell title='Created at (UTC)' width='25%'/>
            <CustomCell title='Completed at (UTC)' width='25%'/>
            <CustomCell title='Amount' width='10%'/>
            <CustomCell title='Payment status' width='15%'/>
        </TableHead>
    )
}

export default BalanceHistoryTableHead;