import {Box, Skeleton, Typography} from '@mui/material';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {getBoosterProfileData} from 'src/services/userApi.js';
import {handleApiError} from 'src/components/error/ErrorPage.jsx';
import {getBoosterOrdersHistory} from 'src/services/orderApi.js';
import theme from 'src/theme/theme.jsx';
import OrderHistoryCard from 'src/layouts/boosters/profile/utils/ui/OrderHistoryCard.jsx';
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import OrderHistoryCards from "./OrderHistoryCards.jsx";

const BoosterOrderHistory = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBoosterOrderHistory = useCallback(async () => {
        setIsLoading(true);
        try {
            const orderHistoryApi = await getBoosterOrdersHistory()
            setOrderHistory(orderHistoryApi);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    }, [getBoosterProfileData,]);

    useEffect(() => {
        fetchBoosterOrderHistory();
    }, [fetchBoosterOrderHistory]);

    const renderOrderHistory = useMemo(() => {
        if (isLoading) {
            return (
                <OrderHistoryCards>
                    {[...Array(3)].map((_, index) => (
                        <Box key={index} sx={{flexShrink: 0, width: {xs: 300, sm: 400}}}>
                            <OrderHistoryCard isLoading={isLoading}/>
                        </Box>
                    ))}
                </OrderHistoryCards>
            )
        }
        if (!isLoading && orderHistory.length === 0) {
            return (
                <Box sx={{
                    height: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography
                        variant="body1"
                        sx={{
                            p: 1 / 2,
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}>
                        So far, you don't have a history of completed orders...
                    </Typography>
                </Box>
            )
        }

        return (
            <OrderHistoryCards>
                {orderHistory.map((order) => (
                    <Box key={order.id} sx={{flexShrink: 0, width: {xs: 300, sm: 400}}}>
                        <OrderHistoryCard order={order}/>
                    </Box>
                ))}
            </OrderHistoryCards>
        )

    }, [isLoading, orderHistory]);

    return (
        <Box sx={
            {
                mt: 3,
                mr: 3,
                p: {xs: 3, sm: 5, md: 10},
                width: {xs: '100%', lg: '73%'},
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.paper
            }}>
            <Typography
                variant='h4'
                sx={{
                    mb: 2,
                    fontSize: {xs: 20, sm: 34},
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightMedium,
                }}>
                Order History
            </Typography>
            {renderOrderHistory}
        </Box>
    )
}

export default BoosterOrderHistory;