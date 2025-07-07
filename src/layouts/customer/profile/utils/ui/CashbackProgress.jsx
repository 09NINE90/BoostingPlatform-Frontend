import React, {useState} from "react";
import {Box, Chip, LinearProgress, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";
import BoosterLevelsDescription from "src/layouts/boosters/profile/utils/ui/BoosterLevelsDescription.jsx";
import AccountProgressbar from "src/layouts/utils/ui/AccountProgressbar.jsx";
import CustomerStatusDescription from "src/layouts/customer/profile/utils/ui/CustomerStatusDescription.jsx";

const CashbackProgress = ({customerStatus, nextCustomerStatus, progressAccountStatus, discountPercentage}) => {

    return (
        <Box sx={{
            flex: 1,
            padding: 10,
            mt: 3,
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4" sx={{
                mb: 2,
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
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
                    tooltipTitle={<CustomerStatusDescription customerNextStatus={nextCustomerStatus}/>}/>
                Current status:
                <Chip label={customerStatus} sx={{marginInline: 2}}/>
                • {discountPercentage}% cashback by order
            </Typography>
            <AccountProgressbar progress={progressAccountStatus}/>
        </Box>
    )
}

export default CashbackProgress;