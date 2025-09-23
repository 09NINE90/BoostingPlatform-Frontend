import {Box} from "@mui/material";
import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import React, {useState} from "react";
import BlueTextField from "src/layouts/utils/ui/BlueTextField.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import {validateUrl} from "../../../../utils/functions.js";

const StartSessionModal = ({isOpen, isSessionLoading, onClose, startSession}) => {

    const [duration, setDuration] = useState(1);
    const [streamLink, setStreamLink] = useState('');
    const [error, setError] = useState('');

    const handleStartSession = () => {
        if (duration && !error) {
            startSession(duration, streamLink);
            onClose();
        }
    };

    const handleChangeLink = (e) => {
        const value = e.target.value;
        setStreamLink(value);

        const validation = validateUrl(value);
        setError(validation.message);
    };

    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Start session'
            content={
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, mt: 2}}>
                    <BlueTextField
                        required
                        error={!duration}
                        type='number'
                        label="Duration time (hours)"
                        variant="outlined"
                        placeholder={duration}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        fullWidth
                    />
                    <BlueTextField
                        error={!!error}
                        helperText={error}
                        label="Stream link (optional)"
                        variant="outlined"
                        value={streamLink}
                        onChange={handleChangeLink}
                        fullWidth
                    />
                </Box>
            }
            actions={
                <ContainedBlueButton
                    disabled={!duration || !!error}
                    loading={isSessionLoading}
                    onClick={handleStartSession}
                    sx={{mt: 5, width: '100%',}}
                >
                    start session
                </ContainedBlueButton>
            }
        />
    )
}

export default StartSessionModal;