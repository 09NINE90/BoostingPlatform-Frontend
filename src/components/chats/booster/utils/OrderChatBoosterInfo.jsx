import theme from "src/theme/theme.jsx";
import {Box, Button, Typography} from "@mui/material";
import React from "react";
import OrderChatOptions from "src/components/chats/utils/OrderChatOptions.jsx";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import CustomTextItem from "src/components/chats/utils/CustomTextItem.jsx";
import TipOrderHistory from "src/components/chats/allUserUtils/TipOrderHistory.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";
import {UTC_ALL_TIME} from "src/utils/constants/TooltipsTexts.js";

const OrderChatBoosterInfo = ({order, openModal, tipOrderHistory}) => {
    if (order) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    padding: 5,
                    width: '29%',
                    minWidth: '29%',
                    height: "85vh",
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.paper,
                }}>
                <Box sx={{flexGrow: 1, overflowY: 'auto', pr: 1}}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}>
                        Order information
                        <HelpIconWithTooltip tooltipTitle={UTC_ALL_TIME} marginLeft={2} sizeIcon='medium'/>
                    </Typography>
                    <CustomTextItem text='Order' item={order.secondId}/>
                    <CustomTextItem text='Status' item={order.orderStatus}/>
                    <CustomTextItem text='Game' item={order.gameName}/>
                    <CustomTextItem text='Platform' item={order.gamePlatform}/>
                    <CustomTextItem text='Start order at' item={order.startTimeExecution}/>
                    <CustomTextItem text='Salary' item={`$ ${order.boosterSalary}`}/>
                    <OrderChatOptions selectedOptions={order.selectedOptions}/>
                    {tipOrderHistory && (
                        <TipOrderHistory tipOrderHistory={tipOrderHistory}/>
                    )}
                </Box>
                {order.orderStatus === IN_PROGRESS && (
                    <Box>
                        <Button
                            onClick={() => openModal(order)}
                            sx={{
                                mt: 2,
                                p: 2,
                                width: "100%",
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.background.default,
                                fontWeight: theme.typography.fontWeightLight,
                                border: 1,
                                borderColor: theme.palette.text.primary,
                                textDecoration: 'none',
                                '&:hover': {
                                    backgroundColor: theme.palette.background.paper,
                                    borderColor: theme.palette.third.main,
                                }
                            }}
                        >
                            Start session
                        </Button>
                        <Button
                            onClick={() => openModal()}
                            sx={{
                                mt: 2,
                                p: 2,
                                width: "100%",
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.third.main,
                                fontWeight: theme.typography.fontWeightLight,
                                '&:hover': {
                                    backgroundColor: theme.palette.third.hover,
                                }
                            }}
                        >
                            Finish order
                        </Button>
                    </Box>
                )}
            </Box>
        )
    }

}

export default OrderChatBoosterInfo;