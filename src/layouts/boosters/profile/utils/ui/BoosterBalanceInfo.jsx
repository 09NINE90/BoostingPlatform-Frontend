import theme from "src/theme/theme.jsx";
import {Box, Button, Typography} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';
import React from "react";

const BoosterBalanceInfo = ({balance, openModal}) => {

    return (
        <Box sx={{
            mt: 3,
            padding: 5,
            maxWidth: '25%',
            minWidth: '25%',
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4" sx={{
                color: theme.palette.text.primary,
                marginBottom: 2,
                fontWeight: theme.typography.fontWeightMedium,
            }}>
                My balance
            </Typography>
            <Box sx={{
                mt: 5,
                padding: 5,
                backgroundColor: theme.palette.background.default,
            }}>
                <Typography variant="h5" sx={{
                    color: theme.palette.third.main,
                    marginBottom: 2,
                    fontWeight: theme.typography.fontWeightMedium,
                }}>
                    Available for withdrawal
                </Typography>
                <Typography variant="h4" sx={{
                    color: theme.palette.text.primary,
                    marginBottom: 2,
                    fontWeight: theme.typography.fontWeightMedium,
                }}>
                    $ {balance}
                </Typography>
                <Box sx={{
                    minWidth: '100%',
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 5
                }}>
                    <Button
                        onClick={openModal}
                        sx={{
                            padding: 3,
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightLight,
                            '&:hover': {
                                backgroundColor: theme.palette.third.hover,
                            }
                        }}>
                        Withdraw
                    </Button>
                    <Button
                        to={'/booster/balanceHistory'}
                        component={Link}
                        sx={{
                            padding: 3,
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.default,
                            fontWeight: theme.typography.fontWeightLight,
                            border: 1,
                            borderColor: theme.palette.text.primary,
                            textDecoration: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.background.paper,
                                borderColor: theme.palette.third.main,
                            }
                        }}>
                        <HistoryIcon fontSize="small" sx={{mr: 2}}/>
                        Balance history
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default BoosterBalanceInfo;