import theme from "src/theme/theme.jsx";
import {Button} from "@mui/material";

const ContainedBlueButton = ({sx = {}, ...props}) => {

    const baseSx = {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.third.main,
        fontWeight: theme.typography.fontWeightLight,
        '&:hover': {
            backgroundColor: theme.palette.third.hover,
        },
        ...sx,
    }
    return (
        <Button
            variant="contained"
            sx={baseSx}
            {...props}
        />
    )
}

export default ContainedBlueButton;