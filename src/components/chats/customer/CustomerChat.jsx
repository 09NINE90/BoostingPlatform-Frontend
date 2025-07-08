import {useParams} from "react-router";
import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {Box} from "@mui/material";
import OrderChatCustomerInfo from "src/components/chats/customer/utils/OrderChatCustomerInfo.jsx";
import React, {useLayoutEffect} from "react";

const CustomerChat = () => {

    const { chatId, orderId } = useParams();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            <OrderChatCustomerInfo orderId={orderId}/>
            <ChatComponent chatId={chatId}/>
        </Box>
    )
}

export default CustomerChat;