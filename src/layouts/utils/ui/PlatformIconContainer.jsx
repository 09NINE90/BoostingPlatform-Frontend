import React from 'react';
import { Box } from '@mui/material';
import {platformIcons} from "src/utils/constants/gamePlatforms.js";

const PlatformIconContainer = ({ platformId, size = {xs: 20, md: 24} }) => {
    const platform = platformIcons.find(p => p.id === platformId);

    return (
        <Box
            sx={{
                ml: 2,
                display: 'flex',
                alignItems: 'center',
                width: size,
                height: size
            }}
        >
            {platform ? (
                <platform.Icon aria-label={platform.alt} />
            ) : null}
        </Box>
    );
};

export default PlatformIconContainer;