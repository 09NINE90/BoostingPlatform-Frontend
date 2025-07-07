import {Box, Button, TextField} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";

const ChatInput = ({inputMessage, setInputMessage, handleSendMessage, isConnected}) => {
    return (
        <Box>
            <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                    }
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: theme.palette.divider,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.third.main,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.third.main,
                            },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    disabled={!isConnected() || inputMessage === ''}
                    onClick={handleSendMessage}
                    sx={{
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        '&:hover': {
                            backgroundColor: theme.palette.third.hover,
                        }
                    }}>
                    Send
                </Button>
            </Box>
        </Box>
    )
}

export default ChatInput;