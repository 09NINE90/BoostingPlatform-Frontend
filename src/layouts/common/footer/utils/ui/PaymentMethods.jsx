import React from "react";
import {ApplePay, Bitcoin, GooglePay, Mastercard, PayPal, Visa} from "src/assets/icons/index.js";
import {Box} from "@mui/material";

const PaymentMethods = () => {
    const paymentMethods = [
        {id: 'visa', Icon: Visa, alt: 'Visa'},
        {id: 'mastercard', Icon: Mastercard, alt: 'Mastercard'},
        {id: 'paypal', Icon: PayPal, alt: 'PayPal'},
        {id: 'bitcoin', Icon: Bitcoin, alt: 'Bitcoin'},
        {id: 'applepay', Icon: ApplePay, alt: 'ApplePay'},
        {id: 'googlepay', Icon: GooglePay, alt: 'GooglePay'}
    ];

    return (
        <Box sx={{
            width: '80%',
            maxWidth: 1200,
            px: {xs: 2, md: 8},
            mx: 'auto'
        }}>
            <Box sx={{
                display: {xs: 'none', md: 'flex'},
                justifyContent: 'space-between',
                width: '100%'
            }}>
                {paymentMethods.map(({id, Icon, alt}) => (
                    <Box key={id} sx={{display: 'flex', alignItems: 'center'}}>
                        <Icon aria-label={alt}/>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                display: {xs: 'grid', md: 'none'},
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
                width: '100%',
                justifyItems: 'center',
                px: 2
            }}>
                {paymentMethods.map(({id, Icon, alt}) => (
                    <Box key={id} sx={{
                        height: 'fit-content',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        <Icon aria-label={alt}/>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PaymentMethods;