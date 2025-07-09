import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {useParams} from "react-router";
import {Box} from "@mui/material";
import OrderChatBoosterInfo from "src/components/chats/booster/utils/OrderChatBoosterInfo.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {completeExecutionOrder, getBoosterOrderById} from "src/services/orderApi.js";
import {toast} from "react-toastify";
import OrderFinishModal from "src/components/chats/booster/utils/OrderFinishModal.jsx";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {getOrderTipHistory} from "src/services/financeApi.js";
import StartSessionModal from "src/components/chats/booster/utils/StartSessionModal.jsx";
import {getSessionStartMessage} from "src/components/chats/booster/utils/SessionStartMessage.jsx";
import {formatUTCDateTime} from "src/utils/functions.js";

const BoosterChat = () => {

    const {chatId, orderId} = useParams();

    const [sendMessageFn, setSendMessageFn] = useState(null);
    const [startSessionModalIsOpen, setStartSessionModalIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [order, setOrder] = useState(null);
    const [tipOrderHistory, setTipOrderHistory] = useState(null);

    const openStartSessionModal = () => setStartSessionModalIsOpen(true);
    const closeStartSessionModal = () => setStartSessionModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const fetchTipOrderHistory = useCallback(async () => {
        try {
            const tipOrderHistoryApi = await getOrderTipHistory(orderId);
            setTipOrderHistory(tipOrderHistoryApi)
        } catch (err) {
            console.error(handleApiError(err))
        }
    }, [getOrderTipHistory, orderId])

    const fetchBoosterOrders = useCallback(async () => {
        try {
            const orderApi = await getBoosterOrderById(orderId);
            setOrder(orderApi);
        } catch (err) {
            console.error(handleApiError(err))
        }
    }, [getBoosterOrderById, setOrder])

    const startSession = (duration, streamLink) => {
        if (!sendMessageFn) return;

        console.log(duration, streamLink);

        sendMessageFn(`/app/chat/${chatId}`, {
            text: getSessionStartMessage(duration, streamLink, formatUTCDateTime(new Date())),
            timestamp: new Date().toISOString(),
        });
    };

    const handleCompleteExecution = async () => {
        try {
            await completeExecutionOrder(orderId);
            toast.success('The order has been successfully submitted for verification')
            await fetchBoosterOrders();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        closeModal();
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBoosterOrders();
    }, [fetchBoosterOrders]);

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
                padding: 3,
                paddingInline: 25,
            }}>
            <OrderChatBoosterInfo order={order}
                                  openModal={openModal}
                                  openStartSessionModal={openStartSessionModal}
                                  tipOrderHistory={tipOrderHistory}
            />
            <ChatComponent
                chatId={chatId}
                onReady={(sendMessage) => setSendMessageFn(() => sendMessage)}
            />
            {modalIsOpen && (
                <OrderFinishModal isOpen={modalIsOpen} onClose={closeModal}
                                  onComplete={handleCompleteExecution}
                />
            )}
            {startSessionModalIsOpen && (
                <StartSessionModal
                    isOpen={startSessionModalIsOpen}
                    onClose={closeStartSessionModal}
                    startSession={startSession}
                />
            )}
        </Box>
    )
}

export default BoosterChat;