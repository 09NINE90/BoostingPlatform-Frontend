import {Box, Card, CardContent, Typography} from "@mui/material";
import {toLocaleDateTime} from "src/utils/functions.js";
import theme from "src/theme/theme.jsx";
import React from "react";

const MobileBalanceHistory = ({balanceHistoryList}) => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {balanceHistoryList.map((item) => (
                <Card key={item.id} variant="outlined" sx={{backgroundColor: theme.palette.background.default}}>
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