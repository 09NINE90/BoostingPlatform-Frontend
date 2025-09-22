import {Box, Chip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import DOMPurify from 'dompurify';
import React from "react";
import {marked} from "marked";
import {formatDividerDate, isSameDay, toLocaleTime} from "src/utils/functions.js";

const ChatMessages = ({messages, username}) => {
    let lastDate = null;

    const domPurifyConfig = {
        ADD_ATTR: ['target', 'rel'],
    };

    return (
        <>
            {messages.map((msg) => {
                const currentDate = new Date(msg.createdAt);
                const showDateDivider = !lastDate || !isSameDay(lastDate, currentDate);
                lastDate = currentDate;

                const rawHtml = marked(msg.text);
                const cleanHtml = DOMPurify.sanitize(rawHtml, domPurifyConfig);
                const isMine = msg.sender === username;

                return (
                    <React.Fragment key={msg.id}>
                        {showDateDivider && (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    my: 2,
                                    position: 'relative',
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                <Chip
                                    label={formatDividerDate(currentDate)}
                                    sx={{
                                        fontWeight: theme.typography.fontWeightLight,
                                    }}
                                />
                            </Box>
                        )}
                        <Box
                            sx={{
                                mb: 2,
                                p: 2,
                                width: 'fit-content',
                                maxWidth: "60%",
                                borderRadius: 2,
                                ml: isMine ? "auto" : 0,
                                mr: isMine ? 0 : "auto",
                                bgcolor: isMine
                                    ? theme.palette.third.hover
                                    : theme.palette.background.default,
                                color: isMine
                                    ? theme.palette.primary.contrastText
                                    : theme.palette.text.primary,
                                borderTopRightRadius: isMine ? 0 : 8,
                                borderTopLeftRadius: isMine ? 8 : 0,
                            }}
                        >
                            {!isMine && (
                                <Typography
                                    variant="subtitle2"
                                    color={theme.palette.text.secondary}
                                    fontWeight={theme.typography.fontWeightMedium}
                                    sx={{mb: 0.5}}
                                >
                                    {msg.sender}
                                </Typography>
                            )}
                            <Box
                                sx={{
                                    lineHeight: 1.2,
                                    whiteSpace: 'pre-line',
                                    overflowWrap: 'break-word',
                                    fontWeight: theme.typography.fontWeightLight,
                                }}
                                dangerouslySetInnerHTML={{__html: cleanHtml}}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    display: "block",
                                    mt: 1,
                                    textAlign: "right",
                                    color: theme.palette.text.secondary,
                                    fontWeight: theme.typography.fontWeightLight,
                                }}
                            >
                                {toLocaleTime(msg.createdAt)}
                            </Typography>

                        </Box>
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default ChatMessages;