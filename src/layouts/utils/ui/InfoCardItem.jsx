import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";

const InfoCardItem = ({label, value}) => {

    return (
        <Box sx={{
            mr: 5,
            mt: 2,
            gap: 5,
            flex: 1,
            padding: 4,
            minHeight: '120px',
            paddingInline: 5,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.default,
        }}>
            <Typography variant="h6"
                        sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}>
                {label}
            </Typography>
            <Typography variant="h5"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}>
                {value}
            </Typography>
        </Box>
    )
}

export default InfoCardItem;