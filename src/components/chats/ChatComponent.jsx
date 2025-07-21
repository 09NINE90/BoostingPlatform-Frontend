import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectToken, selectUsername} from "src/store/slice/authSlice.js";
import useWebSocket from "src/components/chats/useWebsocket.js";
import {getChatRoom} from "src/services/chats.js";
import {Box, Divider} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ChatMessages from "src/components/chats/utils/ChatMessages.jsx";
import ChatInput from "src/components/chats/utils/ChatInput.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const ChatComponent = ({chatId, onReady}) => {

    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const userToken = useSelector(selectToken);
    const username = useSelector(selectUsername);

    const subscriptionRef = React.useRef(null);

    const {connect, disconnect, subscribe, sendMessage, unsubscribe, isConnected} = useWebSocket(
        'ws://localhost/ws',
        {
            onConnect: () => {
                subscriptionRef.current = subscribe(`/topic/chat/${chatId}`, (message) => {
                    try {
                        const newMessage = JSON.parse(message.body);
                        setMessages(prev => [...prev, newMessage]);
                    } catch (error) {
                        console.error('Error parsing message:', error);
                    }
                });
            },
            onError: (error) => {
                console.error('Chat connection error:', error);
            }
        }
    );

    useEffect(() => {
        if (!userToken) return;

        connect(userToken);

        return () => {
            if (subscriptionRef.current) unsubscribe(subscriptionRef.current);
            disconnect();
        };
    }, [userToken]);

    useEffect(() => {
        if (isConnected && onReady) {
            onReady(sendMessage);
            setTimeout(() => scrollToBottom(), 400);
        }
    }, [isConnected, onReady]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!userToken) return;
            setIsLoading(true)
            try {
                const roomData = await getChatRoom(chatId);
                if (roomData.messages) {
                    setMessages(roomData.messages);
                    setTimeout(() => scrollToBottom("auto"), 400);
                } else {
                    console.warn("No messages found in room data");
                }
            } catch (e) {
                console.error("Failed to load chat room messages:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [userToken, chatId]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        sendMessage(`/app/chat/${chatId}`, {
            text: inputMessage,
            timestamp: new Date().toISOString(),
        });

        setInputMessage('');

        setTimeout(() => scrollToBottom(), 400);
    };

    const scrollToBottom = (behavior = "smooth") => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: behavior,
                block: "nearest"
            });
        });
    };

    useEffect(() => {
        setTimeout(() => scrollToBottom(), 200);
    }, []);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
            if (isNearBottom) {
                scrollToBottom();
            }
        }
    }, [messages]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "85vh",
                width: "70%",
                minWidth: "70%",
                px: 5,
                py: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 1,
            }}
        >
            {isLoading && (
                <CustomLoader size={0.8} height='100%'/>
            )}
            {!isLoading && (
                <>
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            pr: 1,
                        }}
                    >
                        <ChatMessages messages={messages} username={username}/>
                        <div ref={messagesEndRef}/>
                    </Box>

                    <Divider sx={{my: 2}}/>

                    <ChatInput inputMessage={inputMessage} setInputMessage={setInputMessage}
                               handleSendMessage={handleSendMessage} isConnected={isConnected}/>
                </>
            )}
        </Box>
    );
};

export default ChatComponent;