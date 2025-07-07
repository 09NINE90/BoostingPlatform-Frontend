import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {useParams} from "react-router";
import {Box} from "@mui/material";
import OrderChatBoosterInfo from "src/components/chats/booster/utils/OrderChatBoosterInfo.jsx";
import React, {useState} from "react";
import {completeExecutionOrder} from "src/services/orderApi.js";
import {toast} from "react-toastify";
import OrderFinishModal from "src/components/chats/booster/utils/OrderFinishModal.jsx";

const BoosterChat = () => {

    const {chatId} = useParams();
    const {orderId} = useParams();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCompleteExecution = async () => {
        try {
            await completeExecutionOrder(orderId);
            toast.success('The order has been successfully submitted for verification')
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
            <OrderChatBoosterInfo orderId={orderId} openModal={openModal}/>
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