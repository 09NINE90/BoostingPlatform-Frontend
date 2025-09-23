import ModalTemplate from "../../../../utils/modalTemplate/ModalTemplate.jsx";
import ContainedBlueButton from "../../../../layouts/utils/ui/ContainedBlueButton.jsx";
import React, {useState} from "react";
import {Box} from "@mui/material";
import BlueTextField from "../../../../layouts/utils/ui/BlueTextField.jsx";
import {validateUrl} from "../../../../utils/functions.js";

const FinishSessionModal = ({isOpen, isSessionLoading, onClose, finishSession}) => {

    const [progressMessage, setProgressMassage] = useState('');
    const [reportLink, setReportLink] = useState('');
    const [reportError, setReportError] = useState('');

    const handleFinishSession = () => {
        if (progressMessage && reportLink && !reportError) {
            finishSession(progressMessage, reportLink);
            onClose();
        }
    };

    const handleChangeReportLink = (e) => {
        const value = e.target.value;
        setReportLink(value);

        const validation = validateUrl(value);
        setReportError(validation.message);
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
                        error={!!reportError}
                        helperText={reportError}
                        label="Report link"
                        variant="outlined"
                        value={reportLink}
                        onChange={handleChangeReportLink}
                        fullWidth
                    />
                </Box>
            }
            actions={
                <ContainedBlueButton
                    disabled={!progressMessage || !reportLink || !!reportError}
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