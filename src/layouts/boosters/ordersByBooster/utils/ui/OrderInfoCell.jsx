import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";
import React from "react";
import {UTC_TIME} from "src/utils/constants/TooltipsTexts.js";

const OrderInfoCell = ({orderByRow}) => {

    const OrderTime = ({text, time}) => {
        return (
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                }}>
                <HelpIconWithTooltip tooltipTitle={UTC_TIME}/>
                <Typography variant="body2"
                            sx={{
                                display: 'flex',
                                color: theme.palette.text.secondary,
                                fontWeight: theme.typography.fontWeightLight,
                            }}>
                    <Box
                        component="span"
                        sx={{
                            mr: 2,
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight,
                        }}
                    >
                        <Typography variant="body2" component="span">
                            {text}:
                        </Typography>
                    </Box>
                    {time}
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight
                        }}>
                {orderByRow.offerName}
            </Typography>
            <Typography variant="body2"
                        sx={{
                            mt: 2,
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightLight
                        }}>
                ID: {orderByRow.secondId}
            </Typography>
            <OrderOptions order={orderByRow}/>
            {orderByRow.startTimeExecution && (
                <OrderTime text='Start time execution' time={orderByRow.startTimeExecution}/>
            )}
            {orderByRow.endTimeExecution && (
                <OrderTime text='End time execution' time={orderByRow.endTimeExecution}/>
            )}
            {orderByRow.completedAt && (
                <OrderTime text='Order status changed to completed' time={orderByRow.completedAt}/>
            )}
        </Box>
    )
}

export default OrderInfoCell;