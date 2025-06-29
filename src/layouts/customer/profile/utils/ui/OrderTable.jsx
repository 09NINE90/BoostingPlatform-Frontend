import React, {useCallback, useEffect, useState} from "react";
import {getOrdersByCreator} from "src/services/orderApi.js";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OrderStatusesFilter from "src/layouts/customer/profile/utils/ui/OrderStatusesFilter.jsx";
import {statuses} from "src/layouts/customer/profile/utils/data/StatusesData.json.js";
import {gamePlatforms} from "src/layouts/customer/profile/utils/data/GamePlatforms.js";
import {ON_PENDING} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";

const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({status: "CREATED"});

    const fetchOrdersData = useCallback(async () => {
        try {
            const ordersApi = await getOrdersByCreator(selectedStatus)
            setOrders(ordersApi);
        } catch (error) {
            setOrders([]);
            console.log(error);
        }
    }, [getOrdersByCreator, selectedStatus]);

    useEffect(() => {
        fetchOrdersData();
    }, [fetchOrdersData]);

    return (
        <Box sx={{
            maxWidth: '100%',
            padding: 5,
            mt: 3,
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
                        <Box
                            key={order.orderId}
                            sx={{
                                p: 4,
                                mb: 4,
                                position: "relative",
                                backgroundColor: theme.palette.background.default,
                            }}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg kanit-regular text-text-primary">
                                    <span className="text-third">OFFER</span> {order.offerName}
                                    <span className="text-third ml-2">ID: {order.secondId}</span>
                                    <h3 className="text-lg kanit-regular text-text-primary">
                                        <span
                                            className="text-third">Platform:</span> {gamePlatforms.get(order.gamePlatform)}
                                    </h3>
                                </h3>

                                <span className={`px-3 py-1 text-xs kanit-light ${
                                    order.orderStatus === 'CREATED' ? 'bg-[#0A0022] text-text-primary border border-text-primary' :
                                        order.orderStatus === 'IN_PROGRESS' ? 'bg-[#0A0022] text-primary border border-primary' :
                                            order.orderStatus === 'ON_PENDING' ? 'bg-[#0A0022] text-third border border-third' :
                                                'bg-[#0A0022] text-completed border border-completed'
                                }`}>{order.orderStatus.replace('_', ' ')}</span>

                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-text-primary opacity-80 mb-1">Game</p>
                                <p className="text-text-primary font-medium">{order.gameName}</p>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-background-paper">
                                <span className="text-xl font-bold text-third">$ {order.totalPrice}</span>
                            </div>
                        </Box>
                    ))}
                </>
            )}
            {orders.length === 0 && selectedStatus.status !== null && (
                <EmptyResponse text={'no orders by filter'}/>
            )}
            {orders.length === 0 && selectedStatus.status === null && (
                <EmptyResponse text={'you have not orders'}/>
            )}
        </Box>

    )
};

export default OrderTable;