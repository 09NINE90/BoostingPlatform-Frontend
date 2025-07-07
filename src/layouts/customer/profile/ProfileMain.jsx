import {Box} from '@mui/material';
import OrderTable from "src/layouts/customer/profile/utils/ui/OrderTable.jsx";
import CashbackProgress from "src/layouts/customer/profile/utils/ui/CashbackProgress.jsx";
import CustomerProfileInfo from "src/layouts/customer/profile/utils/ui/CustomerProfileInfo.jsx";
import {useCallback, useEffect, useState} from "react";
import {getCustomerProfileData} from "src/services/userApi.js";
import {handleApiError} from "src/components/error/ErrorPage.jsx";

function ProfileMain() {
    const [discountPercentage, setDiscountPercentage] = useState(null);
    const [cashbackBalance, setCashbackBalance] = useState(null);
    const [customerStatus, setCustomerStatus] = useState(null);
    const [nextCustomerStatus, setNextCustomerStatus] = useState(null);
    const [progressAccountStatus, setProgressAccountStatus] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);

    const fetchCustomerProfile = useCallback(async () => {
        try {
            const profile = await getCustomerProfileData()
            setTotalOrders(profile.totalOrders);
            setCustomerStatus(profile.status);
            setCashbackBalance(profile.cashbackBalance);
            setDiscountPercentage(profile.discountPercentage);
            setNextCustomerStatus(profile.nextStatus);
            setProgressAccountStatus(profile.progressAccountStatus);
        } catch (err) {
            console.log(handleApiError(err));
        }
    }, [getCustomerProfileData, setCustomerStatus, setCashbackBalance, setDiscountPercentage]);


    useEffect(() => {
        fetchCustomerProfile();
    }, [fetchCustomerProfile]);

    return (
        <Box sx={{padding: 3, paddingInline: 25, display: 'flex', flexDirection: 'column', gap: 3}}>
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
