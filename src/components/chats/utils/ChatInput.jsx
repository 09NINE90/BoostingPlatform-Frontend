import {Box, TextField, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const ChatInput = ({inputMessage, setInputMessage, handleSendMessage, isConnected}) => {
    return (
        <Box>
            <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    size="small"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
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
                <ContainedBlueButton
                    variant="contained"
                    disabled={!isConnected() || inputMessage === ''}
                    onClick={handleSendMessage}
                >
                    Send
                </ContainedBlueButton>
            </Box>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{mt: 1, ml: 0.5}}
            >
                Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> to add a new line. The chat also
                supports markdown
            </Typography>
        </Box>
    )
}

export default ChatInput;