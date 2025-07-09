import {Box, Button, TextField} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import React, {useState} from "react";

const StartSessionModal = ({isOpen, onClose, startSession}) => {

    const [duration, setDuration] = useState(1);
    const [streamLink, setStreamLink] = useState('');

    const handleStartSession = () => {
        if (duration) {
            startSession(duration, streamLink);
            onClose();
        }
    };

    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Start session'
            content={
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, mt: 2}}>
                    <TextField
                        required
                        error={!duration}
                        type='number'
                        label="Duration time (hours)"
                        variant="outlined"
                        placeholder={duration}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        fullWidth
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: theme.palette.divider,
                            },
                            '&:hover .MuiInputLabel-root': {
                                color: theme.palette.third.main,
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.third.main,
                            },
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
                    <TextField
                        label="Stream link (optional)"
                        variant="outlined"
                        value={streamLink}
                        onChange={(e) => setStreamLink(e.target.value)}
                        fullWidth
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: theme.palette.divider,
                            },
                            '&:hover .MuiInputLabel-root': {
                                color: theme.palette.third.main,
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.third.main,
                            },
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
                </Box>
            }
            actions={
                <Button
                    onClick={handleStartSession}
                    sx={{
                        mt: 5,
                        width: '100%',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        '&:hover': {
                            backgroundColor: theme.palette.third.hover,
                        }
                    }}>
                    start session
                </Button>
            }
        />
    )
}

export default StartSessionModal;