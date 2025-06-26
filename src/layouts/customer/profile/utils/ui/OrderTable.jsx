import React, {useCallback, useEffect, useState} from "react";
import {getOrdersByCreator} from "src/services/orderApi.js";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";
import OrderStatusesFilter from "src/layouts/customer/profile/utils/ui/OrderStatusesFilter.jsx";
import {statuses} from "src/layouts/customer/profile/utils/data/StatusesData.json.js";
import {gamePlatforms} from "src/layouts/customer/profile/utils/data/GamePlatforms.js";

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
        <div className="relative">
            <div className="kanit-bold text-white text-2xl mb-2">
                Your Orders
            </div>
            <OrderStatusesFilter statuses={statuses} setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
            {orders && (
                <>
                    {orders.map((order) => (
                        <div key={order.orderId}
                             className="relative bg-[#110134] rounded-lg p-4 mb-4 border-l-4 border-[#FD980B] hover:shadow-lg transition-all hover:scale-[1.01]">

                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg kanit-regular text-text-primary">
                                    <span className="text-primary">OFFER</span> {order.offerName}
                                    <span className="text-primary ml-2">#{order.secondId}</span>
                                    <h3 className="text-lg kanit-regular text-text-primary">
                                        <span className="text-primary">Platform:</span> {gamePlatforms.get(order.gamePlatform)}
                                    </h3>
                                </h3>

                                <span className={`px-3 py-1 text-xs kanit-light rounded-full ${
                                    order.orderStatus === 'CREATED' ? 'bg-[#0A0022] text-primary border border-primary' :
                                        order.orderStatus === 'IN_PROGRESS' ? 'bg-[#0A0022] text-text-primary border border-[#FFFFFF]' :
                                            'bg-[#0A0022] text-red-400 border border-red-400'
                                }`}>{order.orderStatus.replace('_', ' ')}</span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-text-primary opacity-80 mb-1">Game</p>
                                <p className="text-text-primary font-medium">{order.gameName}</p>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-background-paper">
                                <span className="text-xl font-bold text-primary">$ {order.totalPrice}</span>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-background-paper rounded-b-lg"></div>
                        </div>
                    ))}
                </>
            )}
            {orders.length === 0 && selectedStatus.status !== null && (
                <EmptyResponse text={'no orders by filter'}/>
            )}
            {orders.length === 0 && selectedStatus.status === null && (
                <EmptyResponse text={'you have not orders'}/>
            )}
        </div>
    )
};

export default OrderTable;