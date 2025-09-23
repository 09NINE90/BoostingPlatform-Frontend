import {TextField, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import Box from "@mui/material/Box";
import {useState} from "react";

const BlueTextField = ({sx = {}, maxLength, showCounter = false, ...props}) => {
    const [charCount, setCharCount] = useState(0);

    const baseSx = {
        '&:hover .MuiInputLabel-root': {
            color: theme.palette.third.main,
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.third.main,
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.third.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.third.main,
            },
        },
        ...sx,
    };

    const handleChange = (e) => {
        const value = e.target.value;

        if (maxLength && value.length > maxLength) {
            return;
        }

        setCharCount(value.length);

        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <Box sx={{position: 'relative'}}>
            <TextField
                variant="outlined"
                fullWidth
                sx={baseSx}
                inputProps={{maxLength: maxLength}}
                {...props}
                onChange={handleChange}
            />
            {showCounter && maxLength && (
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        color: charCount === maxLength ? 'error.main' : 'text.secondary'
                    }}
                >
                    {charCount}/{maxLength}
                </Typography>
            )}
        </Box>
    )
}

export default BlueTextField;