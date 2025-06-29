import theme from "src/theme/theme.jsx";
import {InputAdornment, TextField, Typography} from "@mui/material";
import React from "react";

const AmountTextField = ({inputValue, onChange, placeholder}) => {
    return (
        <TextField
            fullWidth
            type="number"
            value={inputValue}
            onChange={onChange}
            placeholder={placeholder}
            sx={{
                '& .MuiInputBase-root': {
                    height: 40,
                    backgroundColor: theme.palette.background.default,
                },
                '& .MuiInputBase-input': {
                    py: 0.5,
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Typography color="text.secondary">$</Typography>
                    </InputAdornment>
                ),
                sx: {
                    height: 40,
                    '& .MuiInputBase-input': {
                        py: 0.5,
                    },
                }
            }}
        />
    )
}

export default AmountTextField;