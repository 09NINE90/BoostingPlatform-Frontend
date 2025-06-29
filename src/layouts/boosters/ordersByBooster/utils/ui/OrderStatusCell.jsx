import {
    IN_PROGRESS,
    ON_PENDING,
    ordersStatusesMap
} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import React from "react";

const OrderStatusCell = ({orderStatus}) => {
    return (
        <span className={`px-3 py-1 text-xs kanit-light ${
            orderStatus === IN_PROGRESS ? 'bg-background-default text-primary border border-primary' :
                orderStatus === ON_PENDING ? 'bg-background-default text-third border border-third' :
                    'bg-background-default text-completed border border-completed'
        }`}>{ordersStatusesMap.get(orderStatus)}</span>
    )
}

export default OrderStatusCell;