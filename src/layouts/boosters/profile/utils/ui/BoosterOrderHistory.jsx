import {Box, Typography} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {getBoosterProfileData} from 'src/services/userApi.js';
import {handleApiError} from 'src/components/error/ErrorPage.jsx';
import {getBoosterOrdersHistory} from 'src/services/orderApi.js';
import theme from 'src/theme/theme.jsx';
import OrderHistoryCard from 'src/layouts/boosters/profile/utils/ui/OrderHistoryCard.jsx';
import {UTC_TIME} from "src/utils/constants/TooltipsTexts.js";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";

const BoosterOrderHistory = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBoosterOrderHistory = useCallback(async () => {
        setLoading(true);
        try {
            const orderHistoryApi = await getBoosterOrdersHistory()
            setOrderHistory(orderHistoryApi);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [getBoosterProfileData,]);

    useEffect(() => {
        fetchBoosterOrderHistory();
    }, [fetchBoosterOrderHistory]);

    return (
        <Box sx={
            {
                mt: 3,
                mr: 3,
                padding: 10,
                width: '73%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.paper
            }}>
            <Typography
                variant='h4'
                sx={{
                    mb: 2,
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightMedium,
                }}>
                Order History
            </Typography>
            {orderHistory.length === 0 && (
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        position:'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Typography
                        sx={{
                            fontSize: 18,
                            padding: 1/2,
                            position: 'absolute',
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}>
                        So far, you don't have a history of completed orders...
                    </Typography>
                </Box>
            )}
            <Box
                sx={{
                    py: 5,
                    gap: 3,
                    display: 'flex',
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: theme.palette.third.hover,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '4px',
                        backgroundColor: theme.palette.third.main,
                    },
                }}>
                {orderHistory.map((order) => (
                    <Box key={order.id} sx={{ flexShrink: 0, width: 400}}>
                        <OrderHistoryCard order={order}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default BoosterOrderHistory;