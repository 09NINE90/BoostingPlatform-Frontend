import {Box} from "@mui/material";
import React from "react";

const ProfileInfoGroup = ({children}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            alignItems: {xs: 'flex-start', sm: 'center'},
            gap: {xs: 1, sm: 5},
            mt: {xs: 1, sm: 0}
        }}>
            {children}
        </Box>
    )
}

export default ProfileInfoGroup;