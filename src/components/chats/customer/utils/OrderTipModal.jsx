import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import React, {useCallback, useState} from "react";
import AlertMessage from "src/layouts/utils/ui/AlertMessage.jsx";
import AmountTextField from "src/layouts/boosters/profile/utils/ui/AmountTextField.jsx";
import ProcessingInfo from "src/layouts/boosters/profile/utils/ui/ProcessingInfo.jsx";
import {postHandleSendTip} from "src/services/financeApi.js";
import {toast} from "react-toastify";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const OrderTipModal = ({isOpen, onClose, selectedOrder, refreshTipHistory}) => {

    const minAmount = 3;

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputValue, setInputValue] = useState(minAmount);

    const handleMaxInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendTip = useCallback(async () => {
        if (inputValue < minAmount) {
            setErrorMessage('The entered amount is less than the minimum amount')
        } else {
            setErrorMessage(null)
            try {
                setIsLoading(true);
                const request = {
                    orderId: selectedOrder.orderId,
                    tipAmount: inputValue
                }
                await postHandleSendTip(request);
                toast.success('Tip has been successfully sent');
                refreshTipHistory()
                onClose()
            } catch (error) {
                setErrorMessage(handleApiError(error));
            } finally {
                setIsLoading(false);
            }
        }
    }, [inputValue, setErrorMessage]);

    const LabelText = ({text}) => {
        return (
            <Typography
                variant='body1'
                sx={{
                    mb: 2,
                    color: theme.palette.text.secondary,
                    fontWeight: theme.typography.fontWeightLight,
                }}>
                {text}
            </Typography>
        )
    }

    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Send tips'
            backgroundColor={theme.palette.background.paper}
            content={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column"
                    }}>
                    <AlertMessage
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                    <LabelText text='Amount'/>
                    <AmountTextField
                        inputValue={inputValue}
                        onChange={handleMaxInputChange}
                        placeholder={minAmount}
                    />
                    <ProcessingInfo minAmount={minAmount}/>
                </Box>
            }
            actions={
                <ContainedBlueButton
                    loading={isLoading}
                    onClick={handleSendTip}
                    sx={{mt: 5, width: '100%'}}
                >
                    Send
                </ContainedBlueButton>
            }
        />
    )
}

export default OrderTipModal;