import {Box, Typography, useMediaQuery} from "@mui/material";
import theme from "src/theme/theme.jsx";
import OrderOptions from "src/layouts/utils/ui/OrderOptions.jsx";
import React from "react";
import {toLocaleDateTime} from "src/utils/functions.js";
import AccordionOrderOptions from "src/layouts/utils/ui/AccordionOrderOptions.jsx";
import PlatformIconContainer from "src/layouts/utils/ui/PlatformIconContainer.jsx";

const OrderInfoCell = ({orderByRow}) => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    const OrderTime = ({text, time}) => {
        return (
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                }}>
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
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, mb: 2}}>
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight
                        }}>
                {orderByRow.offerName}
            </Typography>
            {isMobile && (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="body2" sx={{mb: 0.5, color: theme.palette.text.secondary}}>
                        Platform: {orderByRow.gamePlatform.name}
                    </Typography>
                    <PlatformIconContainer platformId={orderByRow.gamePlatform.title} />
                </Box>
            )}
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightLight
                        }}>
                ID: {orderByRow.secondId}
            </Typography>
            {isMobile ? (
                    <AccordionOrderOptions selectedOptions={orderByRow.selectedOptions}/>
                )
                : (
                    <OrderOptions order={orderByRow}/>
                )
            }
            {orderByRow.startTimeExecution && (
                <OrderTime text='Start time execution' time={toLocaleDateTime(orderByRow.startTimeExecution)}/>
            )}
            {orderByRow.endTimeExecution && (
                <OrderTime text='End time execution' time={toLocaleDateTime(orderByRow.endTimeExecution)}/>
            )}
            {orderByRow.completedAt && (
                <OrderTime text='Order status changed to completed' time={toLocaleDateTime(orderByRow.completedAt)}/>
            )}
        </Box>
    )
}

export default OrderInfoCell;