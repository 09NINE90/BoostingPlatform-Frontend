import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {Box} from '@mui/material';
import BoosterProfileInfo from "src/layouts/boosters/profile/utils/ui/BoosterProfileInfo.jsx";
import {getBoosterProfileData} from "src/services/userApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import BoosterAccountStatus from "src/layouts/boosters/profile/utils/ui/BoosterAccountStatus.jsx";
import BoosterBalanceInfo from "src/layouts/boosters/profile/utils/ui/BoosterBalanceInfo.jsx";
import WithdrawModal from "src/layouts/boosters/profile/utils/ui/WithdrawModal.jsx";
import BoosterOrderHistory from "src/layouts/boosters/profile/utils/ui/BoosterOrderHistory.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const ProfileMain = () => {
    const [modalWithdrawIsOpen, setModalWithdrawIsOpen] = useState(false);
    const [boosterLevel, setBoosterLevel] = useState(null);
    const [boosterNextLevel, setBoosterNextLevel] = useState(null);
    const [percentageOfOrder, setPercentageOfOrder] = useState(null);
    const [balance, setBalance] = useState(null);
    const [numberOfCompletedOrders, setNumberOfCompletedOrders] = useState(null);
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalTips, setTotalTips] = useState(null);
    const [progressAccountStatus, setProgressAccountStatus] = useState(null);
    const [gameTags, setGameTags] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openWithdrawModal = () => {
        setModalWithdrawIsOpen(true);
    };

    const closeWithdrawModal = () => {
        setModalWithdrawIsOpen(false);
    };

    const fetchBoosterProfile = useCallback(async () => {
        setLoading(true);
        try {
            const profile = await getBoosterProfileData()
            setBoosterLevel(profile.level);
            setBalance(profile.balance);
            setPercentageOfOrder(profile.percentageOfOrder);
            setTotalIncome(profile.totalIncome);
            setTotalTips(profile.totalTips);
            setProgressAccountStatus(profile.progressAccountStatus);
            setBoosterNextLevel(profile.nextLevel);
            setGameTags(profile.gameTags);
            setNumberOfCompletedOrders(profile.numberOfCompletedOrders);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [getBoosterProfileData, setBoosterLevel, setBalance, setPercentageOfOrder, setTotalIncome, setTotalTips]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBoosterProfile();
    }, [fetchBoosterProfile]);

    if (error) {
        return (
            <ErrorPage error={error}/>
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
        <Box
            sx={{
                height: '100%',
                p: 3,
                paddingInline: {xs: 2, lg: 25},
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}>
            <BoosterProfileInfo
                balance={balance}
                totalIncome={totalIncome}
                totalTips={totalTips}
                gameTags={gameTags}
                numberOfCompletedOrders={numberOfCompletedOrders}
            />
            <BoosterAccountStatus
                boosterNextLevel={boosterNextLevel}
                boosterLevel={boosterLevel}
                percentageOfOrder={percentageOfOrder}
                progressAccountStatus={progressAccountStatus}
            />
            <Box sx={{
                gap: 3,
                display: 'flex',
                flexDirection: {xs: 'column', lg: 'row'},
                justifyContent: 'space-between',
            }}>
                <BoosterOrderHistory/>
                <BoosterBalanceInfo
                    balance={balance}
                    openModal={openWithdrawModal}
                />
            </Box>
            {modalWithdrawIsOpen && (
                <WithdrawModal isOpen={modalWithdrawIsOpen} onClose={closeWithdrawModal}
                               balance={balance} updateProfile={fetchBoosterProfile}/>
            )}
        </Box>
    );
}

export default ProfileMain;