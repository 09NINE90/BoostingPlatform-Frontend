import ModalTemplate from "../../../../utils/modalTemplate/ModalTemplate.jsx";
import ContainedBlueButton from "../../../../layouts/utils/ui/ContainedBlueButton.jsx";
import React, {useState} from "react";
import {Box} from "@mui/material";
import BlueTextField from "../../../../layouts/utils/ui/BlueTextField.jsx";

const FinishSessionModal = ({isOpen, isSessionLoading, onClose, finishSession}) => {

    const [progressMessage, setProgressMassage] = useState('');
    const [imgurLink, setImgurLink] = useState('');

    const handleFinishSession = () => {
        if (progressMessage && imgurLink) {
            finishSession(progressMessage, imgurLink);
            onClose();
        }
    };

    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Finish session'
            content={
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, mt: 2}}>
                    <BlueTextField
                        required
                        showCounter={true}
                        maxLength={300}
                        label="What was done"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={progressMessage}
                        onChange={(e) => setProgressMassage(e.target.value)}
                        fullWidth
                    />
                    <BlueTextField
                        required
                        label="Imgur link"
                        variant="outlined"
                        value={imgurLink}
                        onChange={(e) => setImgurLink(e.target.value)}
                        fullWidth
                    />
                </Box>
            }
            actions={
                <ContainedBlueButton
                    loading={isSessionLoading}
                    onClick={handleFinishSession}
                    sx={{mt: 5, width: '100%',}}
                >
                    Finish session
                </ContainedBlueButton>
            }
        />
    )
}

export default FinishSessionModal;