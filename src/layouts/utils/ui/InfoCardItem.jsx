import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";

const InfoCardItem = ({label, value}) => {

    return (
        <Box sx={{
            mt: 2,
            padding: 4,
            paddingInline: 5,
            display: 'flex',
            flex: 1,
            gap: 5,
            mr: 5,
            flexDirection: 'column',
            backgroundColor: theme.palette.background.default,
        }}>
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightMedium,
                            fontSize: 20
                        }}>
                {label}
            </Typography>
            <Typography variant="body1"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightMedium,
                            fontSize: 26
                        }}>
                {value}
            </Typography>
        </Box>
    )
}

export default InfoCardItem;