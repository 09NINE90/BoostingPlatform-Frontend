import {TextField} from "@mui/material";
import theme from "src/theme/theme.jsx";

const BlueTextField = ({sx = {}, ...props}) => {

    const baseSx = {
        '& .MuiInputLabel-root': {
            color: theme.palette.divider,
        },
        '&:hover .MuiInputLabel-root': {
            color: theme.palette.third.main,
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.third.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.divider,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.third.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.third.main,
            },
        },
        ...sx,
    };

    return (
        <TextField
            variant="outlined"
            fullWidth
            sx={baseSx}
            {...props}
        />
    )
}

export default BlueTextField;