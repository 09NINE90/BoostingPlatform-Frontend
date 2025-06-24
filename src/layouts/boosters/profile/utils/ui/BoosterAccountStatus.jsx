import {Box, Chip, LinearProgress, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";

const BoosterAccountStatus = ({boosterLevel, percentageOfOrder, progressAccountStatus})=>{
    return (
        <Box sx={{flex: 1}}>
            <Box sx={{
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
                    Current Level:
                    <Chip
                        label={boosterLevel}
                        sx={{marginInline: 2}}
                    />
                    • {percentageOfOrder}% by order
                </Typography>
                <LinearProgress
                    variant="buffer"
                    value={progressAccountStatus}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.palette.secondary,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default BoosterAccountStatus;