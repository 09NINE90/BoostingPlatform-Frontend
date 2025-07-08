import {Box, Button, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React, {useCallback, useEffect, useState} from "react";
import OrderChatOptions from "src/components/chats/utils/OrderChatOptions.jsx";
import {getBoosterOrderById, getCustomerOrderById} from "src/services/orderApi.js";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {getMiniBoosterProfileData} from "src/services/userApi.js";
import CustomTextItem from "src/components/chats/utils/CustomTextItem.jsx";
import BoosterInfo from "src/components/chats/customer/utils/BoosterInfo.jsx";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import TipOrderHistory from "src/components/chats/allUserUtils/TipOrderHistory.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";
import {UTC_ALL_TIME} from "src/utils/constants/TooltipsTexts.js";

const OrderChatCustomerInfo = ({orderId, openModal, tipOrderHistory}) => {

    const [order, setOrder] = useState(null);
    const [boosterId, setBoosterId] = useState(null);
    const [boosterInfo, setBoosterInfo] = useState(null);

    const fetchBoosterOrders = useCallback(async () => {
        try {
            const orderApi = await getCustomerOrderById(orderId);
            setBoosterId(orderApi.boosterId)
            setOrder(orderApi);
        } catch (err) {
            console.error(handleApiError(err))
        }
    }, [getBoosterOrderById, orderId])

    const fetchBoosterInfo = useCallback(async () => {
        if (!boosterId) return;
        try {
            const boosterInfoApi = await getMiniBoosterProfileData(boosterId);
            setBoosterInfo(boosterInfoApi);
        } catch (err) {
            console.error(handleApiError(err))
        }
    }, [getMiniBoosterProfileData, boosterId]);

    useEffect(() => {
        fetchBoosterOrders()
    }, [fetchBoosterOrders])

    useEffect(() => {
        fetchBoosterInfo()
    }, [fetchBoosterInfo])

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
                    {order.endTimeExecution && (
                        <CustomTextItem text='End order at' item={order.endTimeExecution}/>
                    )}
                    <CustomTextItem text='Price' item={`$ ${order.totalPrice}`}/>
                    <OrderChatOptions selectedOptions={order.selectedOptions}/>
                    {boosterInfo && (
                        <BoosterInfo boosterInfo={boosterInfo}/>
                    )}
                    {tipOrderHistory && (
                        <TipOrderHistory tipOrderHistory={tipOrderHistory}/>
                    )}
                </Box>
                {order.orderStatus !== IN_PROGRESS && (
                    <Box>
                        <Button
                            onClick={() => openModal(order)}
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
                            send tip
                        </Button>
                    </Box>
                )}
            </Box>
        )
    }

}

export default OrderChatCustomerInfo;