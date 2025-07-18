import React, {useCallback, useEffect, useState} from "react";
import {getOrdersByCreator} from "src/services/orderApi.js";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OrderStatusesFilter from "src/layouts/customer/profile/utils/ui/OrderStatusesFilter.jsx";
import {statuses} from "src/layouts/customer/profile/utils/data/StatusesData.json.js";
import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import CustomerOrderCart from "src/layouts/customer/profile/utils/ui/CustomerOrderCart.jsx";
import {getMiniBoosterProfileData} from "src/services/userApi.js";
import BoosterMiniProfileModal from "src/layouts/customer/profile/utils/ui/BoosterMiniProfileModal.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

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

    useEffect(() => {
        fetchOrdersData();
    }, [fetchOrdersData]);

    return (
        <Box sx={{
            p: 5,
            mt: 3,
            minHeight: '450px',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4"
                        sx={{
                            fontWeight: theme.typography.fontWeightMedium,
                            color: theme.palette.text.primary,
                            mb: 5
                        }}>
                Your Orders
            </Typography>

            <OrderStatusesFilter statuses={statuses} setSelectedStatus={setSelectedStatus}
                                 selectedStatus={selectedStatus}/>
            {orders && (
                <>
                    {orders.map((order) => (
                        <CustomerOrderCart key={order.orderId} order={order} onOpen={openBoosterProfile}/>
                    ))}
                </>
            )}
            {!isLoading && orders.length === 0 && selectedStatus.status !== null && (
                <EmptyResponse text={'no orders by filter'} minHeight='100%'/>
            )}
            {!isLoading && orders.length === 0 && selectedStatus.status === null && (
                <EmptyResponse text={'you have not orders'} minHeight='100%'/>
            )}
            {isLoading && (
                <Box sx={{py: '7%'}}>
                    <CustomLoader size={0.7} height='100%'/>
                </Box>
            )}
            {modalIsOpen && (
                <BoosterMiniProfileModal onClose={closeModal} isOpen={modalIsOpen} boosterInfo={boosterProfile}/>
            )}
        </Box>

    )
};

export default OrderTable;