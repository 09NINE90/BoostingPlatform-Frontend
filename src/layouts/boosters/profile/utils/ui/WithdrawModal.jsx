import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Box, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";
import theme from "src/theme/theme.jsx";
import AmountTextField from "src/layouts/boosters/profile/utils/ui/AmountTextField.jsx";
import AlertMessage from "src/layouts/utils/ui/AlertMessage.jsx";
import ProcessingInfo from "src/layouts/boosters/profile/utils/ui/ProcessingInfo.jsx";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {postHandleWithdrawal} from "src/services/financeApi.js";
import {toast} from "react-toastify";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const WithdrawModal = ({isOpen, onClose, balance, updateProfile}) => {

    const minAmount = 50;

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputValue, setInputValue] = useState(minAmount);

    const handleMaxInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleWithdrawal = useCallback(async () => {
        if (inputValue < minAmount) {
            setErrorMessage('The entered amount is less than the minimum amount')
        } else if (inputValue > balance) {
            setErrorMessage('The amount entered is more than your balance')
        } else {
            setErrorMessage(null)
            try {
                setIsLoading(true);
                const request = {
                    withdrawalAmount: inputValue
                }
                await postHandleWithdrawal(request);
                toast.success('Withdrawal request has been successfully submitted for review')
                updateProfile()
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
            title='Withdrawal of funds'
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
                    <LabelText text='Available for balance'/>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 2,
                            color: theme.palette.statuses.completed,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}>
                        $ {balance}
                    </Typography>
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
                    fullWidth
                    onClick={handleWithdrawal}
                    sx={{mt: 5, p: 3,}}
                >
                    send a withdrawal request
                </ContainedBlueButton>
            }
        />
    )
}

export default WithdrawModal;