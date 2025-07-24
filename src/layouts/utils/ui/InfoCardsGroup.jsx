import {Box} from "@mui/material";

const InfoCardsGroup = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            {children}
        </Box>
    );
};

export default InfoCardsGroup;