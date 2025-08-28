import {Box} from "@mui/material";

const InfoCardsContainer = ({ children }) => {
    return (
        <Box sx={{
            mt: 1,
            gap: 2,
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'flex-start', lg: 'center' },
        }}>
            {children}
        </Box>
    );
};

export default InfoCardsContainer;