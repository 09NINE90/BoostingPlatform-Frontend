import theme from "src/theme/theme.jsx";
import {Button} from "@mui/material";

const OutlinedBlueButton = ({sx = {}, ...props}) => {

    const baseSx = {
        border: 1,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        fontWeight: theme.typography.fontWeightLight,
        borderColor: theme.palette.text.primary,
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.third.main,
        },
        ...sx,
    }

    return (
        <Button
            sx={baseSx}
            {...props}
        />
    )
}

export default OutlinedBlueButton;