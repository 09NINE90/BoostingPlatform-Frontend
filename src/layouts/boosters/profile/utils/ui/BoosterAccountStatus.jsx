import {Box, Chip, Skeleton, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React, {useMemo} from "react";
import BoosterLevelsDescription from "src/layouts/boosters/profile/utils/ui/BoosterLevelsDescription.jsx";
import AccountProgressbar from "src/layouts/utils/ui/AccountProgressbar.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";

const BoosterAccountStatus = ({
                                  boosterNextLevel,
                                  boosterLevel,
                                  percentageOfOrder,
                                  progressAccountStatus,
                                  isLoading
                              }) => {

    const renderBoosterLevel = useMemo(() => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton
                        variant="rounded"
                        width={80}
                        height={24}
                        sx={{
                            transform: 'none',
                            borderRadius: '16px',
                        }}
                    />
                    <Skeleton
                        variant="text"
                        width={120}
                        height={20}
                        sx={{
                            transform: 'none',
                        }}
                    />
                </Box>
            )
        }

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                    label={boosterLevel}
                    sx={{
                        fontSize: {xs: 10, sm: 12},
                        height: 24
                    }}
                />
                <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                    • {percentageOfOrder}% by order
                </Typography>
            </Box>
        )
    }, [isLoading, boosterLevel, percentageOfOrder])

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
            <Box sx={{
                color: theme.palette.text.primary,
                mb: 5,
                display: 'flex',
                alignItems: 'center',
                fontSize: {xs: 12, sm: 16},
                fontWeight: theme.typography.fontWeightLight,
                minHeight: 32,
            }}>
                <HelpIconWithTooltip
                    tooltipTitle={<BoosterLevelsDescription boosterNextLevel={boosterNextLevel}/>}
                />
                <Typography
                    variant="body1"
                    component="span"
                    sx={{
                        mx: 1,
                        whiteSpace: 'nowrap'
                    }}
                >
                    Current Level:
                </Typography>
                {renderBoosterLevel}
            </Box>
            <AccountProgressbar progress={progressAccountStatus}/>
        </Box>
    )
}

export default BoosterAccountStatus;