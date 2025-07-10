import theme from "src/theme/theme.jsx";
import {Box, Typography} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import {Link} from 'react-router-dom';
import React from "react";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const BoosterBalanceInfo = ({balance, openModal}) => {

    return (
        <Box sx={{
            mt: 3,
            p: 5,
            maxWidth: '25%',
            minWidth: '25%',
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4" sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontWeight: theme.typography.fontWeightMedium,
            }}>
                My balance
            </Typography>
            <Box sx={{
                mt: 5,
                p: 5,
                backgroundColor: theme.palette.background.default,
            }}>
                <Typography variant="h5" sx={{
                    color: theme.palette.third.main,
                    mb: 2,
                    fontWeight: theme.typography.fontWeightMedium,
                }}>
                    Available for withdrawal
                </Typography>
                <Typography variant="h4" sx={{
                    color: theme.palette.text.primary,
                    mb: 2,
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
                    <ContainedBlueButton
                        onClick={openModal}
                        sx={{p: 3,}}
                    >
                        Withdraw
                    </ContainedBlueButton>
                    <OutlinedBlueButton
                        to={'/booster/balanceHistory'}
                        component={Link}
                        sx={{p: 3,}}
                    >
                        <HistoryIcon fontSize="small" sx={{mr: 2}}/>
                        Balance history
                    </OutlinedBlueButton>
                </Box>
            </Box>

        </Box>
    )
}

export default BoosterBalanceInfo;