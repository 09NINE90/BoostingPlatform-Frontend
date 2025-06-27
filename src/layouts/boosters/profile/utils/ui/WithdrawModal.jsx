import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Box, Button, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";
import theme from "src/theme/theme.jsx";
import AmountTextField from "src/layouts/boosters/profile/utils/ui/AmountTextField.jsx";
import AlertMessage from "src/layouts/utils/ui/AlertMessage.jsx";
import ProcessingInfo from "src/layouts/boosters/profile/utils/ui/ProcessingInfo.jsx";

const WithdrawModal = ({isOpen, onClose, balance}) => {

    const minAmount = 50;
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputValue, setInputValue] = useState(minAmount);
    const handleMaxInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleWithdrawal = useCallback(() => {
        if (inputValue < minAmount) {
            setErrorMessage('The entered amount is less than the minimum amount')
        } else if (inputValue > balance) {
            setErrorMessage('The amount entered is more than your balance')
        } else {
            setErrorMessage(null)
        }
    }, [inputValue, setErrorMessage]);


    const LabelText = ({text}) => {
        return (
            <Typography
                sx={{
                    fontSize: 18,
                    marginBottom: 2,
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
                        m: 3,
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
                        sx={{
                            fontSize: 22,
                            marginBottom: 2,
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

                    <Button
                        fullWidth
                        onClick={handleWithdrawal}
                        sx={{
                            mt: 5,
                            padding: 3,
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightLight,
                            '&:hover': {
                                backgroundColor: theme.palette.third.hover,
                            }
                        }}>
                        send a withdrawal request
                    </Button>
                </Box>
            }
        />
    )
}

export default WithdrawModal;