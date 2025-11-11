import React, {useState, useCallback, useEffect} from 'react';
import {Box} from '@mui/material';
import BoosterProfileInfo from "src/layouts/boosters/profile/utils/ui/BoosterProfileInfo.jsx";
import {getBoosterProfileData} from "src/services/userApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import BoosterAccountStatus from "src/layouts/boosters/profile/utils/ui/BoosterAccountStatus.jsx";
import BoosterBalanceInfo from "src/layouts/boosters/profile/utils/ui/BoosterBalanceInfo.jsx";
import WithdrawModal from "src/layouts/boosters/profile/utils/ui/WithdrawModal.jsx";
import BoosterOrderHistory from "src/layouts/boosters/profile/utils/ui/BoosterOrderHistory.jsx";
import UserReferral from "../../utils/ui/UserReferral.jsx";

const DEFAULT_STATE_PROFILE = {
    modalWithdrawIsOpen: null,
    boosterLevel: null,
    boosterNextLevel: null,
    percentageOfOrder: null,
    balance: null,
    numberOfCompletedOrders: null,
    totalIncome: null,
    totalTips: null,
    progressAccountStatus: null,
    gameTags: null,
    userId: null,
}

const ProfileMain = () => {

    const [state, setState] = useState(DEFAULT_STATE_PROFILE)

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const openWithdrawModal = () => {
        setState((prevState) => ({
            ...prevState,
            modalWithdrawIsOpen: true,
        }))
    };

    const closeWithdrawModal = () => {
        setState((prevState) => ({
            ...prevState,
            modalWithdrawIsOpen: false,
        }))
    };

    const updateState = (updates) => {
        setState((prevState) => ({
            ...prevState,
            ...updates,
        }))
    };

    const fetchBoosterProfile = async () => {
        setIsLoading(true);
        try {
            const response = await getBoosterProfileData()
            updateState({
                userId: response.uuid,
                boosterLevel: response.level,
                balance: response.balance,
                percentageOfOrder: response.percentageOfOrder,
                totalIncome: response.totalIncome,
                totalTips: response.totalTips,
                progressAccountStatus: response.progressAccountStatus,
                boosterNextLevel: response.nextLevel,
                gameTags: response.gameTags,
                numberOfCompletedOrders: response.numberOfCompletedOrders,
            });
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBoosterProfile();
    }, []);

    if (error) {
        return (
            <ErrorPage error={error}/>
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
                balance={state.balance}
                totalIncome={state.totalIncome}
                totalTips={state.totalTips}
                gameTags={state.gameTags}
                numberOfCompletedOrders={state.numberOfCompletedOrders}
                isLoading={isLoading}
            />
            <BoosterAccountStatus
                boosterNextLevel={state.boosterNextLevel}
                boosterLevel={state.boosterLevel}
                percentageOfOrder={state.percentageOfOrder}
                progressAccountStatus={state.progressAccountStatus}
                isLoading={isLoading}
            />
            <UserReferral
                userId={state.userId}
            />
            <Box sx={{
                gap: 3,
                display: 'flex',
                flexDirection: {xs: 'column', lg: 'row'},
                justifyContent: 'space-between',
            }}>
                <BoosterOrderHistory/>
                <BoosterBalanceInfo
                    balance={state.balance}
                    openModal={openWithdrawModal}
                    isLoading={isLoading}
                />
            </Box>
            {state.modalWithdrawIsOpen && (
                <WithdrawModal isOpen={state.modalWithdrawIsOpen} onClose={closeWithdrawModal}
                               balance={state.balance} updateProfile={fetchBoosterProfile}/>
            )}
        </Box>
    );
}

export default ProfileMain;