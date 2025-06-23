import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";

const BoosterProfileInfoItem = ({label, value}) => {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', mt: 1}}>
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightLight,
                            minWidth: 140
                        }}>
                {label}:
            </Typography>
            <Typography variant="body1"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight,
                        }}>
                {value}
            </Typography>
        </Box>
    )
}

export default BoosterProfileInfoItem;