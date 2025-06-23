import React, {useState, useCallback, useEffect} from 'react';
import {Box} from '@mui/material';
import BoosterProfileInfo from "src/layouts/boosters/profile/utils/ui/BoosterProfileInfo.jsx";
import {getBoosterProfileData} from "src/services/userApi.js";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import BoosterAccountStatus from "src/layouts/boosters/profile/utils/ui/BoosterAccountStatus.jsx";

const ProfileMain = () => {
    const [boosterLevel, setBoosterLevel] = useState(null);
    const [boosterNextLevel, setBoosterNextLevel] = useState(null);
    const [percentageOfOrder, setPercentageOfOrder] = useState(null);
    const [balance, setBalance] = useState(null);
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalTips, setTotalTips] = useState(null);
    const [progressAccountStatus, setProgressAccountStatus] = useState(null);

    const fetchBoosterProfile = useCallback(async () => {
        if (boosterLevel === null) {
            try {
                const profile = await getBoosterProfileData()
                setBoosterLevel(profile.level);
                setBalance(profile.balance);
                setPercentageOfOrder(profile.percentageOfOrder);
                setTotalIncome(profile.totalIncome);
                setTotalTips(profile.totalTips);
                setProgressAccountStatus(profile.progressAccountStatus);
                setBoosterNextLevel(profile.nextLevel);
            } catch (err) {
                console.log(handleApiError(err));
            }
        }
    }, [getBoosterProfileData, setBoosterLevel, setBalance, setPercentageOfOrder, setTotalIncome, setTotalTips]);

    useEffect(() => {
        fetchBoosterProfile();
    }, [fetchBoosterProfile]);

    return (
        <Box sx={{height: '100%', padding: 3, display: 'flex', gap: 3}}>
            <BoosterProfileInfo
                balance={balance}
                totalIncome={totalIncome}
                totalTips={totalTips}
            />
            <BoosterAccountStatus
                boosterLevel={boosterLevel}
                percentageOfOrder={percentageOfOrder}
                progressAccountStatus={progressAccountStatus}
            />
        </Box>
    );
}

export default ProfileMain;