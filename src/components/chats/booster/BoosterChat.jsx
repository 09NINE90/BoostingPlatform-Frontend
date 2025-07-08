import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {useParams} from "react-router";
import {Box} from "@mui/material";
import OrderChatBoosterInfo from "src/components/chats/booster/utils/OrderChatBoosterInfo.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {completeExecutionOrder, getBoosterOrderById} from "src/services/orderApi.js";
import {toast} from "react-toastify";
import OrderFinishModal from "src/components/chats/booster/utils/OrderFinishModal.jsx";
import {handleApiError} from "src/components/error/ErrorPage.jsx";

const BoosterChat = () => {

    const { chatId, orderId } = useParams();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [order, setOrder] = useState(null);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const fetchBoosterOrders = useCallback(async () => {
        try {
            const orderApi = await getBoosterOrderById(orderId);
            setOrder(orderApi);
        } catch (err) {
            console.error(handleApiError(err))
        }
    }, [getBoosterOrderById, setOrder])

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBoosterOrders();
    }, [fetchBoosterOrders]);

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
            <OrderChatBoosterInfo order={order} openModal={openModal}/>
            <ChatComponent chatId={chatId}/>
            {modalIsOpen && (
                <OrderFinishModal isOpen={modalIsOpen} onClose={closeModal}
                                  onComplete={handleCompleteExecution}
                />
            )}
        </Box>
    )
}

export default BoosterChat;