import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";

const InfoCardItem = ({label, value}) => {

    return (
        <Box sx={{
            mr: { xs: 0, sm: 5 },
            mt: { xs: 0, sm: 2 },
            gap: { xs: 1, sm: 5 },
            flex: 1,
            p: { xs: 2, sm: 4 },
            minHeight: { xs: 'auto', sm: '120px' },
            width: { xs: '100%', sm: 'auto' },
            paddingInline: { xs: 2, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: {xs: 'center', sm: 'flex-start'},
            backgroundColor: theme.palette.background.default,
        }}>
            <Typography variant="h6"
                        sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightMedium,
                            fontSize: { xs: '1rem', sm: '1.5rem' }
                        }}>
                {label}
            </Typography>
            <Typography variant="h5"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightMedium,
                            fontSize: { xs: '1rem', sm: '1.8rem' }
                        }}>
                {value}
            </Typography>
        </Box>
    )
}

export default InfoCardItem;