import theme from "src/theme/theme.jsx";
import {Box, Skeleton, Typography} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import {Link} from 'react-router-dom';
import React, {useMemo} from "react";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const BoosterBalanceInfo = ({balance, openModal, isLoading}) => {

    const renderBalance = useMemo(() => {
        if (isLoading) {
            return (
                <Skeleton
                    variant="text"
                    sx={{
                        width: '50%',
                        height: 40,
                        mb: 2,
                        transform: 'none',
                    }}
                />
            )
        }

        return (
            <Typography variant="h4" sx={{
                mb: 2,
                height: 40,
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
            }}>
                $ {balance}
            </Typography>
        )
    }, [isLoading, balance]);

    return (
        <Box sx={{
            mt: 3,
            p: {xs: 3, sm: 5},
            maxWidth: {xs: '100%', lg:'25%'},
            minWidth: '25%',
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4" sx={{
                mb: 2,
                fontSize: {xs: 20, sm: 34},
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
            }}>
                My balance
            </Typography>
            <Box sx={{
                mt: 5,
                p: 5,
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row', lg: 'column',},
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: theme.palette.background.default,
            }}>
                <Box>
                    <Typography variant="h5" sx={{
                        mb: 2,
                        fontSize: {xs: 20, md: 30},
                        color: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightMedium,
                    }}>
                        Available for withdrawal
                    </Typography>
                    {renderBalance}
                </Box>
                <Box sx={{
                    minWidth: {xs: '50%', lg: '100%'},
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: {xs: 5, sm: 0, lg: 5}
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