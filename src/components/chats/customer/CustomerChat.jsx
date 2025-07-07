import {useParams} from "react-router";
import ChatComponent from "src/components/chats/ChatComponent.jsx";
import {Box} from "@mui/material";
import OrderChatCustomerInfo from "src/components/chats/customer/utils/OrderChatCustomerInfo.jsx";

const CustomerChat = () => {

    const {chatId} = useParams();
    const {orderId} = useParams();

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