import {Box, IconButton} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAvatar, selectCustomerCashbackBalance,
    selectCustomerDiscountPercentage, selectCustomerStatus,
    selectEmail,
    selectSecondId,
    selectUsername,
    setUsername
} from "src/store/slice/authSlice.js";
import {changeNickname, getCustomerProfileData} from "src/services/userApi.js";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import ProfileInfoItem from "src/layouts/profile/utils/ui/ProfileInfoItem.jsx";
import NameEditor from "src/layouts/profile/utils/ui/NameEditor.jsx";
import SquareAvatar from "src/layouts/profile/utils/ui/SquareAvatar.jsx";

const UserProfile = () => {
    const dispatch = useDispatch();
    const userAvatarFromStore = useSelector(selectAvatar);
    const usernameFromStore = useSelector(selectUsername);
    const emailFromStore = useSelector(selectEmail);
    const secondIdFromStore = useSelector(selectSecondId);
    const discountPercentageFromStore = useSelector(selectCustomerDiscountPercentage);
    const cashbackBalanceFromStore = useSelector(selectCustomerCashbackBalance);
    const customerStatusFromStore = useSelector(selectCustomerStatus);

    const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
    const [userName, setUserName] = useState(usernameFromStore);
    const [discountPercentage, setDiscountPercentage] = useState(discountPercentageFromStore);
    const [cashbackBalance, setCashbackBalance] = useState(cashbackBalanceFromStore);
    const [customerStatus, setCustomerStatus] = useState(customerStatusFromStore);
    const [isEditingName, setIsEditingName] = useState(false);

    const handleNameSave = async (newName) => {
        setUserName(newName);
        dispatch(setUsername(newName));
        setIsEditingName(false);
        try {
            await changeNickname(newName);
        } catch (error) {
            console.log(handleApiError(error));
        }
    };

    const handleNameCancel = () => {
        setIsEditingName(false);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // todo: кидать запрос на бэк
            const reader = new FileReader();
            reader.onloadend = () => {
                // Dispatch action для обновления аватарки в Redux
                console.log("Avatar uploaded:", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchCustomerProfile = useCallback(async () => {
        if (cashbackBalanceFromStore === null) {
            try {
                const profile = await getCustomerProfileData()
                setCustomerStatus(profile.status);
                setCashbackBalance(profile.balance);
                setDiscountPercentage(profile.discountPercentage)
            } catch (err) {
                console.log(handleApiError(err));
            }
        }
    }, [getCustomerProfileData, setCustomerStatus, setCashbackBalance, setDiscountPercentage]);


    useEffect(() => {
        fetchCustomerProfile();
    }, [fetchCustomerProfile]);

    return (
        <Box sx={{
            padding: 3,
            width: '25vw',
            height: 'fit-content'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', mb: 3}}>
                <SquareAvatar
                    src={userAvatar}
                    size={200}
                    onAvatarClick={() => console.log('Avatar clicked')}
                    onFileChange={handleAvatarChange}
                />
                <Box sx={{p: 3}}>
                    <Box sx={{mt: 2, display: 'flex', alignItems: 'center', gap: 1}}>
                        {isEditingName ? (
                            <NameEditor
                                initialName={userName}
                                onSave={handleNameSave}
                                onCancel={handleNameCancel}
                            />
                        ) : (
                            <>
                                <ProfileInfoItem label="Username" value={userName}/>
                                <IconButton size="small" onClick={() => setIsEditingName(true)}>
                                    <EditIcon sx={{color: 'white', fontSize: 16}}/>
                                </IconButton>
                            </>
                        )}
                    </Box>

                    <Box sx={{mt: 3}}>
                        <ProfileInfoItem label="Email" value={emailFromStore}/>
                        <ProfileInfoItem label="ID" value={secondIdFromStore}/>
                        <ProfileInfoItem label="Status" value={customerStatus}/>
                        <ProfileInfoItem label="Discount" value={`${discountPercentage}%`}/>
                        <ProfileInfoItem
                            label="Cashback"
                            value={`$ ${cashbackBalance?.toFixed(2) || '0.00'}`}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default UserProfile;