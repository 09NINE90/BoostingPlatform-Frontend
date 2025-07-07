import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";

const CustomTextItem = ({text, item, fontSize = 18}) => {
    return (
        <Box
            sx={{
                mb: 3,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}>
            <Typography variant="h4" sx={{
                fontSize: {fontSize},
                color: theme.palette.text.secondary,
                fontWeight: theme.typography.fontWeightLight,
            }}>
                {text}:
            </Typography>
            <Typography variant="h4" sx={{
                fontSize: {fontSize},
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightLight,
            }}>
                {item}
            </Typography>
        </Box>

    )
}

export default CustomTextItem;