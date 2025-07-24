import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Box, Typography} from "@mui/material";
import React from "react";
import OrderOptions from "src/layouts/utils/ui/OrderOptions.jsx";
import theme from "src/theme/theme.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const AcceptModal = ({isOpen, onClose, onAccept, selectedOrder, isLoading}) => {

    const CustomText = ({text1, text2}) => {
        return (
            <Box display='flex'>
                <Typography mr={2} fontWeight={theme.typography.fontWeightRegular}>
                    {text1}:
                </Typography>
                <Typography fontWeight={theme.typography.fontWeightLight}>
                    {text2}
                </Typography>
            </Box>
        )
    }
    if (selectedOrder) {
        return (
            <ModalTemplate
                width={'500px'}
                isOpen={isOpen}
                onClose={onClose}
                title='Accept order'
                content={
                    <Box
                        sx={{
                            gap: 1,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <CustomText text1='Order' text2={`${selectedOrder.offerName} #${selectedOrder.secondId}`}/>
                        <CustomText text1='Game' text2={selectedOrder.gameName}/>
                        <CustomText text1='Platform' text2={selectedOrder.gamePlatform}/>
                        <OrderOptions order={selectedOrder}/>
                        <CustomText text1='Price' text2={`${selectedOrder.totalPrice}$`}/>

                    </Box>
                }
                actions={
                    <ContainedBlueButton
                        loading={isLoading}
                        onClick={onAccept}
                        sx={{mt: 'auto', width: '100%',}}
                    >
                        Accept
                    </ContainedBlueButton>
                }
            />
        )
    }
};

export default AcceptModal;
