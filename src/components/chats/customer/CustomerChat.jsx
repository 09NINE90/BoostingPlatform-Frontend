import {useParams} from "react-router";
import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {Box} from "@mui/material";
import OrderChatCustomerInfo from "src/components/chats/customer/utils/OrderChatCustomerInfo.jsx";
import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import OrderTipModal from "src/components/chats/customer/utils/OrderTipModal.jsx";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {getOrderTipHistory} from "src/services/financeApi.js";

const CustomerChat = () => {

    const {chatId, orderId} = useParams();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [tipOrderHistory, setTipOrderHistory] = useState(null);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null);
    }

    const fetchTipOrderHistory = useCallback(async () => {
        try {
            const tipOrderHistoryApi = await getOrderTipHistory(orderId);
            setTipOrderHistory(tipOrderHistoryApi)
        } catch (err) {
            console.error(handleApiError(err))
        }
    }, [getOrderTipHistory, orderId])

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchTipOrderHistory()
    }, [fetchTipOrderHistory])

    return (
        <Box
            sx={{
                width: "100vw",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: '100%',
                p: 3,
                flexDirection: {xs: "column", sm: "row"},
                paddingInline: {xs: 2, sm: 25},
                mb: {xs: '20%', sm: 0}
            }}>
            <OrderChatCustomerInfo orderId={orderId} openModal={openModal} tipOrderHistory={tipOrderHistory}/>
            <ChatComponent chatId={chatId}/>
            {modalIsOpen && (
                <OrderTipModal isOpen={modalIsOpen}
                               onClose={closeModal}
                               selectedOrder={selectedOrder}
                               refreshTipHistory={fetchTipOrderHistory}
                />
            )}
        </Box>
    )
}

export default CustomerChat;