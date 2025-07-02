import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React from "react";
import theme from "src/theme/theme.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";
import {UTC_TIME} from "src/utils/constants/TooltipsTexts.js";

const BalanceHistoryTableHead = () => {

    const CustomCell = ({title, center = true, tooltip = false, width}) => {
        return (

            <TableCell
                align={center ? "center" : "start"}
                sx={{
                    fontWeight: theme.typography.fontWeightLight,
                    width: {width}
                }}>
                {tooltip && (<HelpIconWithTooltip tooltipTitle={UTC_TIME}/>)}
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
            <CustomCell title='Created at' tooltip={true} width='25%'/>
            <CustomCell title='Completed at' tooltip={true} width='25%'/>
            <CustomCell title='Amount' width='10%'/>
            <CustomCell title='Payment status' width='15%'/>
        </TableHead>
    )
}

export default BalanceHistoryTableHead;