import React, {useState, useCallback, useEffect} from 'react';
import {Box} from '@mui/material';
import BoosterProfileInfo from "src/layouts/boosters/profile/utils/ui/BoosterProfileInfo.jsx";
import {getBoosterProfileData} from "src/services/userApi.js";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import BoosterAccountStatus from "src/layouts/boosters/profile/utils/ui/BoosterAccountStatus.jsx";
import {ClipLoader} from "react-spinners";
import BoosterBalanceInfo from "src/layouts/boosters/profile/utils/ui/BoosterBalanceInfo.jsx";
import WithdrawModal from "src/layouts/boosters/profile/utils/ui/WithdrawModal.jsx";

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

    const openWithdrawModal = () => {
        setModalWithdrawIsOpen(true);
    };

    const closeWithdrawModal = () => {
        setModalWithdrawIsOpen(false);
    };

    const fetchBoosterProfile = useCallback(async () => {
        try {
            setLoading(true);
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
            console.log(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [getBoosterProfileData, setBoosterLevel, setBalance, setPercentageOfOrder, setTotalIncome, setTotalTips]);

    useEffect(() => {
        fetchBoosterProfile();
    }, [fetchBoosterProfile]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader
                    color="#FD980B"
                    size={100}
                />
            </div>
        )
    }

    return (
        <Box sx={{height: '100%', padding: 3, paddingInline: 25, display: 'flex', flexDirection: 'column', gap: 3}}>
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
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3
            }}>
                <Box sx={
                    {
                        display: 'flex',
                        minWidth: '70%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    ТУТ БУДЕТ ИСТОРИЯ ЗАКАЗОВ
                </Box>
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