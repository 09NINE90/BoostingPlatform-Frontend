import {Box, Chip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";
import BoosterLevelsDescription from "src/layouts/boosters/profile/utils/ui/BoosterLevelsDescription.jsx";
import AccountProgressbar from "src/layouts/utils/ui/AccountProgressbar.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";

const BoosterAccountStatus = ({boosterNextLevel, boosterLevel, percentageOfOrder, progressAccountStatus}) => {
    return (
        <Box sx={{
            flex: 1,
            p: {xs: 3, sm: 5, md: 10},
            mt: 3,
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4" sx={{
                mb: 2,
                fontSize: {xs: 20, sm: 34},
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
            }}>
                Account Status
            </Typography>
            <Typography
                variant="body1"
                component="div"
                sx={{
                    color: theme.palette.text.primary,
                    mb: 5,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: {xs: 12, sm: 16},
                    fontWeight: theme.typography.fontWeightLight,
                }}>
                <HelpIconWithTooltip
                    tooltipTitle={<BoosterLevelsDescription boosterNextLevel={boosterNextLevel}/>}/>
                Current Level:
                <Chip label={boosterLevel} sx={{marginInline: 2, fontSize: {xs: 10, sm: 12}}}/>
                • {percentageOfOrder}% by order
            </Typography>
            <AccountProgressbar progress={progressAccountStatus}/>
        </Box>
    )
}

export default BoosterAccountStatus;