import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import theme from "../../../theme/theme.jsx";
import Box from "@mui/material/Box";
import {getUserReferralInfo} from "../../../services/userApi.js";
import ReferralGeneralStats from "./ReferralGeneralStats.jsx";
import ReferralLink from "./ReferralLink.jsx";
import ReferralsList from "./ReferralsList.jsx";
import {useSelector} from "react-redux";
import {selectRole} from "../../../store/slice/authSlice.js";
import {BOOSTER_ROLE} from "../../../utils/constants/roles.js";

const UserReferral = ({userId}) => {
    const role = useSelector(selectRole);

    const [referralLink, setReferralLink] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [referralInfo, setReferralInfo] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const basePath = role === BOOSTER_ROLE ? '/become/booster/' : '/auth/signup/'
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        const referralPath = `${basePath}${userId}`;
        setReferralLink(baseUrl + referralPath);

        const fetchReferralInfo = async () => {
            setIsLoading(true);
            try {
                const response = await getUserReferralInfo();
                setReferralInfo(response);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReferralInfo();

    }, [userId, role]);

    return (
        <Box sx={{
            flex: 1,
            p: {xs: 3, sm: 5, md: 10},
            py: {xs: 5},
            mt: 3,
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography variant="h4" sx={{
                mb: 2,
                fontSize: {xs: 20, sm: 34},
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
            }}>
                Referral Program
            </Typography>

            <ReferralLink referralLink={referralLink} isLoading={isLoading}/>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)'},
                gap: 3,
                mb: 4,
                p: 3,
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`
            }}>
                <ReferralGeneralStats
                    referralInfo={referralInfo}
                    isLoading={isLoading}
                />
            </Box>
            <ReferralsList referralInfo={referralInfo}/>

        </Box>
    );
};

export default UserReferral;