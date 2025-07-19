import React from 'react'
import { useState } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const HiddenFieldWithShowIcon = (props) => {
    const [showData, setShowData] = useState(false);

    const { InputProps, ...restProps } = props;

    return (
        <TextField
            {...restProps}
            type={showData ? 'text' : 'password'}
            InputProps={{
                ...InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowData(!showData)}
                            edge="end"
                            aria-label={showData ? "hide password" : "show password"}
                        >
                            {showData ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default HiddenFieldWithShowIcon