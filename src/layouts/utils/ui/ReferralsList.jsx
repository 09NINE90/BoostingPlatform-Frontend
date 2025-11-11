import Accordion from "@mui/material/Accordion";
import theme from "../../../theme/theme.jsx";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import React from "react";
import {toLocaleDate} from "../../../utils/functions.js";

const ReferralsList = ({referralInfo}) => {

    return (
        <Box sx={{mt: 4}}>
            <Accordion sx={{
                mt: 4,
                border: `1px solid ${theme.palette.divider}`,
                '&:before': {display: 'none'}
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    sx={{
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Typography variant="h6" sx={{color: theme.palette.text.primary}}>
                        Your Referrals ({referralInfo?.referrals?.length || 0})
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{p: 0}}>

                    {referralInfo?.referrals?.map((referral, index) => (
                        <Accordion key={referral.relationId} sx={{
                            borderTop: `1px solid ${theme.palette.divider}`,
                            borderBottom: index === (referralInfo.referrals.length - 1) ? `1px solid ${theme.palette.divider}` : 'none',
                            margin: 0,
                            '&:before': {display: 'none'},
                            '&.MuiAccordion-root': {
                                margin: 0,
                            },
                            '&.MuiAccordion-root:before': {
                                display: 'none',
                            }
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                sx={{
                                    backgroundColor: theme.palette.background.default,
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                    <Box sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: referral.hasActivity ? theme.palette.success.main : theme.palette.grey[500],
                                        mr: 2
                                    }}/>
                                    <Typography sx={{fontWeight: 'medium', flex: 1}}>
                                        {referral.referredUserName}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: theme.palette.text.secondary, mr: 2}}>
                                        ${referral.totalEarned.toFixed(2)}
                                    </Typography>
                                </Box>
                            </AccordionSummary>

                            <AccordionDetails sx={{backgroundColor: theme.palette.background.paper}}>
                                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2}}>
                                    <Box>
                                        <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                            Email
                                        </Typography>
                                        <Typography variant="body1" sx={{mb: 1}}>
                                            {referral.referredUserEmail}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                            Commission Rate
                                        </Typography>
                                        <Typography variant="body1" sx={{mb: 1}}>
                                            {referral.referralPercentage * 100}%
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                            Available Balance
                                        </Typography>
                                        <Typography variant="body1" sx={{mb: 1}}>
                                            ${referral.referralBalance.toFixed(2)}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                            Completed Orders
                                        </Typography>
                                        <Typography variant="body1" sx={{mb: 1}}>
                                            {referral.completedOrdersCount}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                            Total Order Amount
                                        </Typography>
                                        <Typography variant="body1" sx={{mb: 1}}>
                                            ${referral.totalOrderAmount.toFixed(2)}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                            Joined
                                        </Typography>
                                        <Typography variant="body1" sx={{mb: 1}}>
                                            {toLocaleDate(referral.createdAt)}
                                        </Typography>
                                    </Box>

                                    {referral.lastActivityAt && (
                                        <Box>
                                            <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                                                Last Activity
                                            </Typography>
                                            <Typography variant="body1">
                                                {toLocaleDate(referral.lastActivityAt)}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default ReferralsList;