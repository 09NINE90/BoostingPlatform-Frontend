import {Box} from '@mui/material';
import OrderTable from "src/layouts/customer/profile/utils/ui/OrderTable.jsx";
import CashbackProgress from "src/layouts/customer/profile/utils/ui/CashbackProgress.jsx";
import CustomerProfileInfo from "src/layouts/customer/profile/utils/ui/CustomerProfileInfo.jsx";
import React, {useEffect, useState} from "react";
import {getCustomerProfileData} from "src/services/userApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import UserReferral from "../../utils/ui/UserReferral.jsx";

const DEFAULT_STATE_PROFILE = {
    discountPercentage: null,
    cashbackBalance: null,
    customerStatus: null,
    nextCustomerStatus: null,
    progressAccountStatus: null,
    totalOrders: null,
    userId: null,
}

const ProfileMain = () => {

    const [state, setState] = useState(DEFAULT_STATE_PROFILE);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateState = (updates) => {
        setState((prevState) => ({
            ...prevState,
            ...updates,
        }))
    };

    const fetchCustomerProfile = async () => {
        setIsLoading(true);
        try {
            const response = await getCustomerProfileData()
            updateState({
                userId: response.uuid,
                totalOrders: response.totalOrders,
                customerStatus: response.status,
                cashbackBalance: response.cashbackBalance,
                discountPercentage: response.discountPercentage,
                nextCustomerStatus: response.nextStatus,
                progressAccountStatus: response.progressAccountStatus,
            });
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCustomerProfile();
    }, []);

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
        <Box
            sx={{
                height: 'fit-content',
                p: 3,
                paddingInline: {xs: 2, lg: 25},
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}>
            <CustomerProfileInfo
                discountPercentage={state.discountPercentage}
                cashbackBalance={state.cashbackBalance}
                customerStatus={state.customerStatus}
                totalOrders={state.totalOrders}
                isLoading={isLoading}
            />
            <CashbackProgress
                discountPercentage={state.discountPercentage}
                customerStatus={state.customerStatus}
                nextCustomerStatus={state.nextCustomerStatus}
                progressAccountStatus={state.progressAccountStatus}
                isLoading={isLoading}
            />
            <UserReferral
                userId={state.userId}
            />
            <OrderTable/>
        </Box>
    );
}

export default ProfileMain;
