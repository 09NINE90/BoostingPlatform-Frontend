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
import {toLocaleDateTime} from "src/utils/functions.js";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const OrderChatCustomerInfo = ({orderId, openModal, tipOrderHistory}) => {

    const [order, setOrder] = useState(null);
    const [boosterId, setBoosterId] = useState(null);
    const [boosterInfo, setBoosterInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        if (order && (boosterId === null || boosterInfo) && tipOrderHistory !== null) {
            setIsLoading(false);
        }
    }, [order, boosterId, boosterInfo, tipOrderHistory]);

    useEffect(() => {
        setIsLoading(true);
        fetchBoosterOrders();
    }, [fetchBoosterOrders])

    useEffect(() => {
        fetchBoosterOrders()
    }, [fetchBoosterOrders])

    useEffect(() => {
        if (boosterId) {
            fetchBoosterInfo();
        }
    }, [fetchBoosterInfo])

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
                    width: '29%',
                    minWidth: '29%',
                    height: "85vh",
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.paper,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <CustomLoader size={0.7} height='100%'/>
            </Box>
        );
    }

    if (order) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
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
                    </Typography>
                    <CustomTextItem text='Order' item={order.secondId}/>
                    <CustomTextItem text='Status' item={order.orderStatus}/>
                    <CustomTextItem text='Game' item={order.gameName}/>
                    <CustomTextItem text='Platform' item={order.gamePlatform}/>
                    <CustomTextItem text='Start order at' item={toLocaleDateTime(order.startTimeExecution)}/>
                    {order.endTimeExecution && (
                        <CustomTextItem text='End order at' item={toLocaleDateTime(order.endTimeExecution)}/>
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
                        <ContainedBlueButton
                            onClick={() => openModal(order)}
                            sx={{mt: 2, p: 2, width: '100%',}}
                        >
                            send tip
                        </ContainedBlueButton>
                    </Box>
                )}
            </Box>
        )
    }

}

export default OrderChatCustomerInfo;