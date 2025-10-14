import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getOrdersByCreator} from "src/services/orderApi.js";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OrderStatusesFilter from "src/layouts/customer/profile/utils/ui/OrderStatusesFilter.jsx";
import {statuses} from "src/layouts/customer/profile/utils/data/StatusesData.json.js";
import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import CustomerOrderCart from "src/layouts/customer/profile/utils/ui/CustomerOrderCart.jsx";
import {getMiniBoosterProfileData} from "src/services/userApi.js";
import BoosterMiniProfileModal from "src/layouts/customer/profile/utils/ui/BoosterMiniProfileModal.jsx";
import CustomerOrderCartSkeleton from "./CustomerOrderCartSkeleton.jsx";

const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({status: "CREATED"});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [boosterProfile, setBoosterProfile] = useState(null);

    const openBoosterProfile = async (boosterId) => {
        try {
            const boosterProfileApi = await getMiniBoosterProfileData(boosterId);
            setBoosterProfile(boosterProfileApi);
            setModalIsOpen(true);
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setBoosterProfile(null);
    };

    const fetchOrdersData = useCallback(async () => {
        setOrders([])
        setIsLoading(true)
        try {
            const ordersApi = await getOrdersByCreator(selectedStatus)
            setOrders(ordersApi);
        } catch (error) {
            setOrders([]);
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }, [getOrdersByCreator, selectedStatus]);

    const renderOrderList = useMemo(() => {
        if (isLoading) {
            return [...Array(4)].map((_, index) => (
                <CustomerOrderCartSkeleton index={index} key={index}/>
            ));
        }

        if (orders.length === 0 && selectedStatus.status !== null) {
            return (
                <EmptyResponse text={'no orders by filter'} minHeight='100%'/>
            )
        }

        if (orders.length === 0 && selectedStatus.status === null) {
            return (
                <EmptyResponse text={'you have not orders'} minHeight='100%'/>
            )
        }

        return (
            <>
                {orders.map((order) => (
                    <CustomerOrderCart key={order.orderId} order={order} onOpen={openBoosterProfile}/>
                ))}
            </>
        )
    })

    useEffect(() => {
        fetchOrdersData();
    }, [fetchOrdersData]);

    return (
        <Box sx={{
            p: {xs: 3, sm: 5, md: 10},
            mt: 3,
            minHeight: '450px',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4"
                        sx={{
                            fontWeight: theme.typography.fontWeightMedium,
                            color: theme.palette.text.primary,
                            fontSize: {xs: 20, sm: 34},
                            mb: 5
                        }}>
                Your Orders
            </Typography>

            <OrderStatusesFilter statuses={statuses} setSelectedStatus={setSelectedStatus}
                                 selectedStatus={selectedStatus}/>

            {renderOrderList}
            {modalIsOpen && (
                <BoosterMiniProfileModal onClose={closeModal} isOpen={modalIsOpen} boosterInfo={boosterProfile}/>
            )}
        </Box>

    )
};

export default OrderTable;