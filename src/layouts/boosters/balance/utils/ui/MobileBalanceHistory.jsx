import {Box, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {toLocaleDateTime} from "src/utils/functions.js";
import theme from "src/theme/theme.jsx";
import React, {useMemo} from "react";

const MobileBalanceHistory = ({balanceHistoryList, isLoading}) => {

    const renderBalanceHistory = useMemo(() => {

        const balanceToRender = isLoading ? [...Array(4)] : balanceHistoryList;

        if (isLoading) {
            return (
                <Box display="flex" flexDirection="column" gap={2}>
                    {balanceToRender.map((_, index) => (
                        <Card key={index} variant="outlined" sx={{
                            backgroundColor: theme.palette.background.default,
                            height: 180,
                        }}>
                            <CardContent>
                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <Skeleton variant="text" width={80} height={17} sx={{transform: 'none', mr: 2}}/>
                                    <Skeleton variant="text" width={100} height={17} sx={{transform: 'none'}}/>
                                </Box>

                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <Skeleton variant="text" width={60} height={17} sx={{transform: 'none', mr: 2}}/>
                                    <Skeleton variant="text" width={80} height={17} sx={{transform: 'none'}}/>
                                </Box>

                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <Skeleton variant="text" width={100} height={17} sx={{transform: 'none', mr: 2}}/>
                                    <Skeleton variant="text" width={120} height={17} sx={{transform: 'none'}}/>
                                </Box>

                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <Skeleton variant="text" width={110} height={17} sx={{transform: 'none', mr: 2}}/>
                                    <Skeleton variant="text" width={120} height={17} sx={{transform: 'none'}}/>
                                </Box>

                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <Skeleton variant="text" width={70} height={17} sx={{transform: 'none', mr: 2}}/>
                                    <Skeleton variant="text" width={60} height={17} sx={{transform: 'none'}}/>
                                </Box>

                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Skeleton variant="text" width={120} height={17} sx={{transform: 'none', mr: 2}}/>
                                    <Skeleton variant="text" width={90} height={17} sx={{transform: 'none'}}/>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )
        }

    }, [balanceHistoryList, isLoading]);

    if (isLoading) return renderBalanceHistory;

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {balanceHistoryList.map((item) => (
                <Card key={item.id} variant="outlined" sx={{
                    backgroundColor: theme.palette.background.default,
                    height: 180,
                }}>
                    <CardContent>
                        <Box sx={{display: 'flex', alignItems: 'center', fontWeight: theme.typography.fontWeightLight}}>
                            <Typography
                                variant="body2"
                                sx={{fontWeight: theme.typography.fontWeightBold, mr: 2}}>
                                Order ID:
                            </Typography>
                            {item.orderId ? `#${item.orderId}` : '-'}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: theme.typography.fontWeightLight,
                            color: item.recordType === 'TIPS'
                                ? theme.palette.primary.main
                                : item.recordType === 'SALARY'
                                    ? theme.palette.third.main
                                    : theme.palette.statuses.red
                        }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: theme.typography.fontWeightBold,
                                    mr: 2,
                                    color: theme.palette.text.primary
                                }}>
                                Type:
                            </Typography>
                            {item.recordType}
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', fontWeight: theme.typography.fontWeightLight}}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: theme.typography.fontWeightBold,
                                    mr: 2,
                                    color: theme.palette.text.primary
                                }}>
                                Created at:
                            </Typography>
                            {item.createdAt ? toLocaleDateTime(item.createdAt) : '-'}
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', fontWeight: theme.typography.fontWeightLight}}>
                            <Typography
                                variant="body2"
                                sx={{fontWeight: theme.typography.fontWeightBold, mr: 2}}>
                                Completed at:
                            </Typography>
                            {item.completedAt ? toLocaleDateTime(item.completedAt) : '-'}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: theme.typography.fontWeightLight,
                            color: item.amount > 0
                                ? theme.palette.statuses.completed
                                : theme.palette.statuses.red
                        }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: theme.typography.fontWeightBold,
                                    mr: 2,
                                    color: theme.palette.text.primary
                                }}>
                                Amount:
                            </Typography>
                            {item.amount}$
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: theme.typography.fontWeightLight,
                                color: item.paymentStatus === 'ON_PENDING'
                                    ? theme.palette.primary.main
                                    : theme.palette.statuses.completed
                            }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: theme.typography.fontWeightBold,
                                    mr: 2,
                                    color: theme.palette.text.primary
                                }}>
                                Payment status:
                            </Typography>
                            {item.paymentStatus}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default MobileBalanceHistory;