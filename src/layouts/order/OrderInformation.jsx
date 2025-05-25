import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from "react-router";
import { Button } from '@mui/material';

const OrderInformation = () => {

    let {uuid} = useParams();

    const [orderDetail, setOrderDetail] = useState({});
    
    const getOrderDetail = async () => {
        return (
            {orderId:"1", game: "COD", platform: "PC", name:"Dark matter Camo", status: "In progress", estimateDate:"20.05.2025", price: "100", desc: "Little Description"}
        )
    }

    useEffect(() => {
        async function fetchData() {
            const orderDetail = await getOrderDetail();
            setOrderDetail(orderDetail);
        }
        fetchData();
    }, []);

  return (
    <div className='flex flex-col items-center justify-between p-3 min-w-[350px] bg-surface m-3 rounded-2xl'>
            <div className='p-3'>Order Information</div>
            <div>
                <div className='p-2'>Order Id: {orderDetail.id}</div>
                <div className='p-2'>Game: {orderDetail.game}</div>
                <div className='p-2'>Platform: {orderDetail.platform}</div>
                <div className='p-2'>Service: {orderDetail.name}</div>
                <div className='p-2'>Description: {orderDetail.desc}</div>
                <div className='p-2'>Price: {orderDetail.price}$</div>
                <div className='p-2'>Estimate Date: {orderDetail.estimateDate}</div>
            </div>
            <div className='flex flex-col py-2'>
                <div className='p-2'>Status: {orderDetail.status}</div>
                <div className='m-3'>
                    <Button  variant="contained">Start Session</Button>
                </div>
                <Button variant="contained" color={"success"}>Finish Order</Button>
            </div>
        </div>
  )
}

export default OrderInformation