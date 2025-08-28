import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React from "react";
import theme from "src/theme/theme.jsx";
import TableRow from "@mui/material/TableRow";

const BalanceHistoryTableHead = () => {

    const CustomCell = ({title, center = true, width}) => {
        return (
            <TableCell
                align={center ? "center" : "left"}
                sx={{
                    fontWeight: theme.typography.fontWeightLight,
                    width: {width},
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
            <TableRow>
                <CustomCell title='Order ID' center={false} width='10%'/>
                <CustomCell title='Type' width='15%'/>
                <CustomCell title='Created at' width='25%'/>
                <CustomCell title='Completed at' width='25%'/>
                <CustomCell title='Amount' width='10%'/>
                <CustomCell title='Payment status' width='15%'/>
            </TableRow>
        </TableHead>
    )
}

export default BalanceHistoryTableHead;