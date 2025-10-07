import Box from "@mui/material/Box";
import {Skeleton, Typography} from "@mui/material";
import theme from "../../../theme/theme.jsx";
import React, {useMemo} from "react";

const ReferralGeneralStats = ({referralInfo, isLoading}) => {

    const StatItem = ({
                          value,
                          label,
                          color = 'primary',
                          prefix = '',
                          suffix = '',
                          valueVariant = 'h4',
                          labelVariant = 'body2',
                          textAlign = 'center'
                      }) => {

        const getSkeletonHeight = () => {
            switch (valueVariant) {
                case 'h4':
                    return 32;
                case 'h5':
                    return 28;
                case 'h6':
                    return 24;
                default:
                    return 32;
            }
        };

        const renderStatItem = useMemo(() => {
            if (isLoading) {
                return (
                    <Skeleton
                        variant="text"
                        sx={{
                            width: '30%',
                            height: '100%',
                            transform: 'none'
                        }}
                    />
                )
            }

            return (
                <Typography
                    variant={valueVariant}
                    sx={{
                        color: theme.palette[color].main,
                        fontWeight: theme.typography.fontWeightBold,
                        lineHeight: 1
                    }}
                >
                    {prefix}{value}{suffix}
                </Typography>
            )
        }, [isLoading, prefix, value, suffix, valueVariant, color]);

        return (
            <Box sx={{textAlign}}>
                <Box sx={{
                    height: getSkeletonHeight(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: textAlign === 'center' ? 'center' :
                        textAlign === 'right' ? 'flex-end' : 'flex-start',
                    mb: 1
                }}>
                    {renderStatItem}
                </Box>
                <Typography
                    variant={labelVariant}
                    sx={{color: theme.palette.text.secondary}}
                >
                    {label}
                </Typography>
            </Box>
        );
    };

    return (
        <>
            <StatItem
                value={referralInfo?.generalStats.totalReferrals || 0}
                label="Total Referrals"
                color="primary"
            />

            <StatItem
                value={referralInfo?.generalStats.activeReferrals || 0}
                label="Active Referrals"
                color="success"
            />

            <StatItem
                value={referralInfo?.generalStats.totalReferralBalance?.toFixed(2) || '0.00'}
                label="Available Balance"
                color="warning"
                prefix="$"
            />

            <StatItem
                value={referralInfo?.generalStats.totalEarned?.toFixed(2) || '0.00'}
                label="Total Earned"
                color="success"
                prefix="$"
            />

            <StatItem
                value={referralInfo?.generalStats.totalReferralsOrderAmount?.toFixed(2) || '0.00'}
                label="Total Order Amount"
                color="info"
                prefix="$"
            />
        </>
    )
}

export default ReferralGeneralStats;