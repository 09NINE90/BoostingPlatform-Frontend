import React, {useCallback, useEffect, useState} from "react";
import {getOffersByCreator} from "src/services/orderApi.js";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";
import OrderStatusesFilter from "src/layouts/profile/utils/ui/OrderStatusesFilter.jsx";
import {statuses} from "src/layouts/profile/utils/data/StatusesData.json.js";

const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({status: "CREATED"});

    const fetchOrdersData = useCallback(async () => {
        try {
            const ordersApi = await getOffersByCreator(selectedStatus)
            setOrders(ordersApi);
        } catch (error) {
            setOrders([]);
            console.log(error);
        }
    }, [getOffersByCreator, selectedStatus]);

    useEffect(() => {
        fetchOrdersData();
    }, [fetchOrdersData]);

    return (
        <div className="relative">
            <OrderStatusesFilter statuses={statuses} setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
            {orders && (
                <>
                    {orders.map((order) => (
                        <div key={order.orderId}
                             className="relative bg-[#110134] rounded-lg p-4 mb-4 border-l-4 border-[#FD980B] hover:shadow-lg transition-all hover:scale-[1.01]">

                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg kanit-regular text-[#FFFFFF]">
                                    <span className="text-[#FD980B]">OFFER</span> {order.offerName}
                                    <span className="text-[#FD980B] ml-2">#{order.orderId}</span>
                                </h3>

                                <span className={`px-3 py-1 text-xs kanit-light rounded-full ${
                                    order.orderStatus === 'CREATED' ? 'bg-[#0A0022] text-[#FD980B] border border-[#FD980B]' :
                                        order.orderStatus === 'IN_PROGRESS' ? 'bg-[#0A0022] text-[#FFFFFF] border border-[#FFFFFF]' :
                                            'bg-[#0A0022] text-red-400 border border-red-400'
                                }`}>{order.orderStatus.replace('_', ' ')}</span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-[#FFFFFF] opacity-80 mb-1">Game</p>
                                <p className="text-[#FFFFFF] font-medium">{order.gameName}</p>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-[#19054D]">
                                <span className="text-xl font-bold text-[#FD980B]">$ {order.totalPrice}</span>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FD980B] to-[#19054D] rounded-b-lg"></div>
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