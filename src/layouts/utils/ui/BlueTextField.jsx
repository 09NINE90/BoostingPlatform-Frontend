import {TextField} from "@mui/material";
import theme from "src/theme/theme.jsx";

const BlueTextField = ({sx = {}, ...props}) => {

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