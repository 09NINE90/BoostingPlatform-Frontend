import {Box} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAvatar, selectDescription,
    selectEmail,
    selectSecondId,
    selectUsername, setDescription,
    setUsername
} from "src/store/slice/authSlice.js";
import {changeDescriptionProfile, changeNickname, getCustomerProfileData} from "src/services/userApi.js";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import UsernameEditor from "src/layouts/utils/ui/UsernameEditor.jsx";
import ProfileInfoItem from "src/layouts/utils/ui/ProfileInfoItem.jsx";
import theme from "src/theme/theme.jsx";
import UsernameInfoItem from "src/layouts/utils/ui/UsernameInfoItem.jsx";
import InfoCardItem from "src/layouts/utils/ui/InfoCardItem.jsx";
import DescriptionEditor from "src/layouts/utils/ui/DescriptionEditor.jsx";
import ProfileDescriptionItem from "src/layouts/utils/ui/ProfileDescriptionItem.jsx";
import UserAvatar from "src/layouts/utils/ui/UserAvatar.jsx";

const CustomerProfileInfo = ({discountPercentage, cashbackBalance, customerStatus, totalOrders}) => {
    const dispatch = useDispatch();
    const userAvatarFromStore = useSelector(selectAvatar);
    const usernameFromStore = useSelector(selectUsername);
    const emailFromStore = useSelector(selectEmail);
    const secondIdFromStore = useSelector(selectSecondId);
    const descriptionProfileFromStore = useSelector(selectDescription);

    const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
    const [userName, setUserName] = useState(usernameFromStore);
    const [descriptionProfile, setDescriptionProfile] = useState(descriptionProfileFromStore);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const [isLoadingNameSave, setIsLoadingNameSave] = useState(false)
    const [isLoadingDescriptionSave, setIsLoadingDescriptionSave] = useState(false)

    const handleNameSave = async (newName) => {
        setIsLoadingNameSave(true)
        try {
            await changeNickname(newName);
            setUserName(newName);
            dispatch(setUsername(newName));
            setIsEditingName(false);
        } catch (error) {
            console.log(handleApiError(error));
        } finally {
            setIsLoadingNameSave(false)
        }
    };

    const handleNameCancel = () => {
        setIsEditingName(false);
    };

    const handleDescriptionSave = async (newDescription) => {
        setIsLoadingDescriptionSave(true)
        try {
            await changeDescriptionProfile(newDescription);
            setDescriptionProfile(newDescription);
            dispatch(setDescription(newDescription));
            setIsEditingDescription(false);
        } catch (error) {
            console.log(handleApiError(error));
        } finally {
            setIsLoadingDescriptionSave(false)
        }
    };

    const handleDescriptionCancel = () => {
        setIsEditingDescription(false);
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

    return (
        <Box sx={{
            p: {xs: 1, sm: 3},
            height: 'fit-content',
            backgroundColor: theme.palette.background.paper,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'start' },
                mb: 3
            }}>
                <Box mt={{ xs: 2, sm: 6 }} ml={{ xs: 0, sm: 6 }}>
                    <UserAvatar
                        src={userAvatar}
                        size={200}
                        onAvatarClick={() => console.log('Avatar clicked')}
                        onFileChange={handleAvatarChange}
                    />
                </Box>

                <Box sx={{
                    paddingInline: { xs: 2, sm: 10 },
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: 1,
                    width: { xs: '100%', sm: 'auto' }
                }}>

                    <Box sx={{ mt: { xs: 2, sm: 2 }, gap: 1 }}>
                        {isEditingName ? (
                            <UsernameEditor
                                initialName={userName}
                                onSave={handleNameSave}
                                onCancel={handleNameCancel}
                                loading={isLoadingNameSave}
                            />
                        ) : (
                            <UsernameInfoItem
                                value={userName}
                                setIsEditingName={setIsEditingName}
                                copyable={true}
                            />
                        )}
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 5 },
                        mt: { xs: 1, sm: 0 }
                    }}>
                        <ProfileInfoItem label="ID" value={secondIdFromStore}/>
                        <ProfileInfoItem label="Email" value={emailFromStore} copyable={true}/>
                    </Box>

                    <Box sx={{
                        mt: 1,
                        display: 'flex',
                        flex: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 2, sm: 0 }
                    }}>
                        <InfoCardItem label='Total orders' value={totalOrders}/>
                        <InfoCardItem label='Status' value={customerStatus}/>
                        <InfoCardItem label='Current discount' value={`${discountPercentage}%`}/>
                        <InfoCardItem label='Cashback balance' value={cashbackBalance}/>
                    </Box>

                    <Box sx={{mt: 2, width: '100%'}}>
                        {isEditingDescription ? (
                            <DescriptionEditor
                                initialDescription={descriptionProfile}
                                onSave={handleDescriptionSave}
                                onCancel={handleDescriptionCancel}
                                loading={isLoadingDescriptionSave}
                            />
                        ) : (
                            <ProfileDescriptionItem
                                label='About me'
                                value={descriptionProfile}
                                setIsEditingDescription={setIsEditingDescription}
                            />
                        )}
                    </Box>
                </Box>

            </Box>
        </Box>

    )
}

export default CustomerProfileInfo;