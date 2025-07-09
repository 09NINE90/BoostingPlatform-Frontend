import theme from "src/theme/theme.jsx";
import {Box, Typography} from "@mui/material";
import React from "react";

const ProcessingInfo = ({minAmount}) => {

    const Item = ({text}) => {
        return (
            <Typography
                variant='body2'
                sx={{
                    mt: 2,
                    color: theme.palette.text.secondary,
                    fontWeight: theme.typography.fontWeightLight,
                }}>
                • {text}
            </Typography>
        )
    }

    return (
        <Box
            sx={{
                mt: 5,
                padding: 4,
                display: "flex",
                minWidth: '100%',
                alignItems: "start",
                flexDirection: "column",
                backgroundColor: theme.palette.background.default,
            }}>
            <Typography
                variant='body2'
                sx={{
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightRegular,
                }}>
                Processing information
            </Typography>
            <Item text='PayPal: instant transfer (3,5% fee)'/>
            <Item text='Cryptocurrency: 1-2 hours (1% fee)'/>
            <Item text={`Minimum withdrawal: ${minAmount}$`}/>
        </Box>
    )
}

export default ProcessingInfo;