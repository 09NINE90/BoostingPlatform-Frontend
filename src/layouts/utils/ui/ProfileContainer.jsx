import {Box} from "@mui/material";
import theme from "src/theme/theme.jsx";

const ProfileContainer = ({ children }) => {
    return (
        <Box sx={{
            p: {xs: 1, sm: 3},
            height: 'fit-content',
            backgroundColor: theme.palette.background.paper,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
                alignItems: {xs: 'center', md: 'start'},
                mb: 3
            }}>
                {children}
            </Box>
        </Box>
    );
};

export default ProfileContainer;