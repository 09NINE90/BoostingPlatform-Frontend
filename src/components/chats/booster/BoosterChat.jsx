import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {useParams} from "react-router";
import {Box} from "@mui/material";
import OrderChatBoosterInfo from "src/components/chats/booster/utils/OrderChatBoosterInfo.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {
    completeExecutionOrder,
    finishSessionRequest,
    getBoosterOrderById,
    startSessionRequest
} from "src/services/orderApi.js";
import {toast} from "react-toastify";
import OrderFinishModal from "src/components/chats/booster/utils/OrderFinishModal.jsx";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {getOrderTipHistory} from "src/services/financeApi.js";
import StartSessionModal from "src/components/chats/booster/utils/StartSessionModal.jsx";
import {getSessionFinishMessage, getSessionStartMessage} from "src/components/chats/booster/utils/SessionMessage.jsx";
import {formatUTCDateTime} from "src/utils/functions.js";
import FinishSessionModal from "./utils/FinishSessionModal.jsx";

const BoosterChat = () => {

    const {chatId, orderId} = useParams();

    const [sendMessageFn, setSendMessageFn] = useState(null);
    const [startSessionModalIsOpen, setStartSessionModalIsOpen] = useState(false);
    const [finishSessionModalIsOpen, setFinishSessionModalIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [order, setOrder] = useState(null);
    const [tipOrderHistory, setTipOrderHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSessionLoading, setIsSessionLoading] = useState(false);

    const openStartSessionModal = () => setStartSessionModalIsOpen(true);
    const closeStartSessionModal = () => setStartSessionModalIsOpen(false);
    const openFinishSessionModal = () => setFinishSessionModalIsOpen(true);
    const closeFinishSessionModal = () => setFinishSessionModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const fetchTipOrderHistory = useCallback(async () => {
        setTipOrderHistory(null);
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
    }, [getBoosterOrderById, setOrder]);

    const handleSessionOperation = async (operation, onSuccess, successMessage) => {
        setIsSessionLoading(true);

        try {
            const result = await operation();
            if (onSuccess) await onSuccess(result);
            toast.success(successMessage);
            return result;
        } catch (err) {
            console.error(handleApiError(err));
            throw err;
        } finally {
            setIsSessionLoading(false);
        }
    };

    const refreshOrder = async () => {
        const orderApi = await getBoosterOrderById(orderId);
        setOrder(orderApi);
        return orderApi;
    };

    const sendChatMessage = (messageText) => {
        if (!sendMessageFn) return;

        sendMessageFn(`/app/chat/${chatId}`, {
            text: messageText,
            timestamp: new Date().toISOString(),
        });
    };

    const startSession = async (duration, streamLink) => {
        await handleSessionOperation(
            async () => {
                await startSessionRequest(orderId, {
                    duration: duration,
                    streamLink: streamLink
                });
            },
            async () => {
                sendChatMessage(getSessionStartMessage(duration, streamLink, formatUTCDateTime(new Date())));
                await refreshOrder();
            },
            'Session started successfully'
        );
    };

    const finishSession = async (progressMessage, imgurLink) => {
        await handleSessionOperation(
            async () => {
                return await finishSessionRequest(
                    order.activeSessionId,
                    {
                        progressMessage: progressMessage,
                        imgurLink: imgurLink
                    });
            },
            async (sessionInfo) => {
                sendChatMessage(getSessionFinishMessage(sessionInfo));
                await refreshOrder();
            },
            'Session finished successfully'
        );
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
        if (order && tipOrderHistory !== null) {
            setIsLoading(false);
        }
    }, [order, tipOrderHistory]);

    useEffect(() => {
        setIsLoading(true);
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
                p: 3,
                flexDirection: {xs: "column", sm: "row"},
                paddingInline: {xs: 2, sm: 25},
            }}>
            <OrderChatBoosterInfo order={order}
                                  isLoading={isLoading}
                                  isSessionLoading={isSessionLoading}
                                  openModal={openModal}
                                  openStartSessionModal={openStartSessionModal}
                                  openFinishSessionModal={openFinishSessionModal}
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
                    isSessionLoading={isSessionLoading}
                    onClose={closeStartSessionModal}
                    startSession={startSession}
                />
            )}
            {finishSessionModalIsOpen && (
                <FinishSessionModal
                    isOpen={finishSessionModalIsOpen}
                    onClose={closeFinishSessionModal}
                    finishSession={finishSession}
                />
            )}
        </Box>
    )
}

export default BoosterChat;