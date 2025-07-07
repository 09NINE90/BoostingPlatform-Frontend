import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";

const ChatMessages = ({ messages, username }) => {
    return (
        <>
            {messages.map((msg) => {
                const isMine = msg.sender === username;

                return (
                    <Box
                        key={msg.id}
                        sx={{
                            mb: 2,
                            p: 2,
                            maxWidth: "70%",
                            borderRadius: 2,
                            ml: isMine ? "auto" : 0,
                            mr: isMine ? 0 : "auto",
                            bgcolor: isMine
                                ? theme.palette.third.hover
                                : theme.palette.background.default,
                            color: isMine
                                ? theme.palette.primary.contrastText
                                : theme.palette.text.primary,
                            borderBottomRightRadius: isMine ? 0 : 8,
                            borderBottomLeftRadius: isMine ? 8 : 0,
                        }}
                    >
                        {!isMine && (
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                                sx={{ mb: 0.5 }}
                            >
                                {msg.sender}
                            </Typography>
                        )}
                        <Typography variant="body2" sx={{whiteSpace: 'pre-line'}}>{msg.text}</Typography>
                        <Typography
                            variant="caption"
                            sx={{ display: "block", mt: 1, textAlign: "right", opacity: 0.7 }}
                        >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>

                    </Box>
                );
            })}
        </>
    );
};

export default ChatMessages;