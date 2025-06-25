import {Box, Chip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";
import BoosterLevelsDescription from "src/layouts/boosters/profile/utils/ui/BoosterLevelsDescription.jsx";
import AccountProgressbar from "src/layouts/boosters/profile/utils/ui/AccountProgressbar.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";

const BoosterAccountStatus = ({boosterNextLevel, boosterLevel, percentageOfOrder, progressAccountStatus}) => {
    return (
        <Box sx={{
            flex: 1,
            borderRadius: 2,
            padding: 3,
            marginBottom: 3,
        }}>
            <Typography variant="h4" sx={{
                color: '#fff',
                marginBottom: 2,
                fontWeight: theme.typography.fontWeightLight,
            }}>
                Account Status
            </Typography>
            <Typography variant="body1"
                        sx={{
                            color: '#fff',
                            marginBottom: 5,
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: theme.typography.fontWeightLight,
                        }}>
                <HelpIconWithTooltip
                    tooltipTitle={<BoosterLevelsDescription boosterNextLevel={boosterNextLevel}/>}/>
                Current Level:
                <Chip label={boosterLevel} sx={{marginInline: 2}}/>
                • {percentageOfOrder}% by order
            </Typography>
            <AccountProgressbar progress={progressAccountStatus}/>
        </Box>
    )
}

export default BoosterAccountStatus;