import theme from "src/theme/theme.jsx";
import {Box, Tooltip, Typography} from "@mui/material";
import React from "react";
import {toLocaleDateTime, useIsTextOverflowed} from "src/utils/functions.js";

const OrderHistoryCard = ({order}) => {

    const [textRef, isOverflowed] = useIsTextOverflowed();

    return (
        <Box sx={{
            border: 1,
            p: 5,
            height: 200,
            width: '100%',
            display: "flex",
            position: 'relative',
            flexDirection: 'column',
            borderColor: theme.palette.third.main,
            backgroundColor: theme.palette.background.default
        }}>
            <Typography
                variant="body1"
                sx={{
                    color: theme.palette.third.hover,
                    fontWeight: theme.typography.fontWeightRegular,
                    position: 'absolute',
                    top: 16,
                    right: 16
                }}>
                #{order.orderId}
            </Typography>

            <Box sx={{mt: 2}}>
                <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                    fontWeight={theme.typography.fontWeightRegular}
                >
                    {order.gameName}
                </Typography>
                <Tooltip
                    title={order.orderName}
                    disableHoverListener={!isOverflowed}
                >
                    <Typography
                        ref={textRef}
                        variant="body1"
                        sx={{
                            width: '90%',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightLight,
                            mt: 0.5,
                            '&:hover': {
                                cursor: isOverflowed ? 'pointer' : 'default'
                            }
                        }}>
                        {order.orderName}
                    </Typography>
                </Tooltip>

            </Box>

            <Box sx={{
                mt: 'auto',
                display: "flex",
                justifyContent: "space-between",
                alignItems: 'flex-end'
            }}>
                <Box
                    sx={{
                        mt: 'auto',
                        display: "flex",
                        alignItems: 'flex-end'
                    }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightLight,
                        }}>
                        Completed: {toLocaleDateTime(order.completedAt)}
                    </Typography>

                </Box>


                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.statuses.completed,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}>
                        {order.orderStatus}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.statuses.completed,
                            fontWeight: theme.typography.fontWeightRegular,
                            mt: 0.5
                        }}>
                        ${order.salary}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderHistoryCard;