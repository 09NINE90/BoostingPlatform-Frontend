import {Box} from '@mui/material';
import OrderTable from "src/layouts/customer/profile/utils/ui/OrderTable.jsx";
import CashbackProgress from "src/layouts/customer/profile/utils/ui/CashbackProgress.jsx";
import CustomerProfileInfo from "src/layouts/customer/profile/utils/ui/CustomerProfileInfo.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {getCustomerProfileData} from "src/services/userApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

function ProfileMain() {
    const [discountPercentage, setDiscountPercentage] = useState(null);
    const [cashbackBalance, setCashbackBalance] = useState(null);
    const [customerStatus, setCustomerStatus] = useState(null);
    const [nextCustomerStatus, setNextCustomerStatus] = useState(null);
    const [progressAccountStatus, setProgressAccountStatus] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomerProfile = useCallback(async () => {
        setLoading(true);
        try {
            const profile = await getCustomerProfileData()
            setTotalOrders(profile.totalOrders);
            setCustomerStatus(profile.status);
            setCashbackBalance(profile.cashbackBalance);
            setDiscountPercentage(profile.discountPercentage);
            setNextCustomerStatus(profile.nextStatus);
            setProgressAccountStatus(profile.progressAccountStatus);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [getCustomerProfileData, setCustomerStatus, setCashbackBalance, setDiscountPercentage]);


    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCustomerProfile();
    }, [fetchCustomerProfile]);

    if (error) {
        return (
            <ErrorPage error={error} />
        )
    }

    if (loading) {
        return (
            <div className="min-h-[100vh]">
                <div className="fixed inset-0 flex items-center justify-center">
                    <CustomLoader height='100%'/>
                </div>
            </div>
        )
    }

    return (
        <Box sx={{p: 3, paddingInline: {xs: 2, sm: 25}, display: 'flex', flexDirection: 'column', gap: 3}}>
            <CustomerProfileInfo
                discountPercentage={discountPercentage}
                cashbackBalance={cashbackBalance}
                customerStatus={customerStatus}
                totalOrders={totalOrders}
            />
            <CashbackProgress
                discountPercentage={discountPercentage}
                customerStatus={customerStatus}
                nextCustomerStatus={nextCustomerStatus}
                progressAccountStatus={progressAccountStatus}
            />
            <OrderTable/>
        </Box>
    );
}

export default ProfileMain;
