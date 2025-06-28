import {Box} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAvatar,
    selectDescription,
    selectEmail,
    selectSecondId,
    selectUsername, setDescription,
    setUsername
} from "src/store/slice/authSlice.js";
import {changeDescriptionProfile, changeNickname} from "src/services/userApi.js";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import ProfileInfoItem from "src/layouts/utils/ui/ProfileInfoItem.jsx";
import UsernameEditor from "src/layouts/utils/ui/UsernameEditor.jsx";
import BoosterGameTags from "src/layouts/boosters/profile/utils/ui/BoosterGameTags.jsx";
import ProfileDescriptionItem from "src/layouts/utils/ui/ProfileDescriptionItem.jsx";
import UsernameInfoItem from "src/layouts/utils/ui/UsernameInfoItem.jsx";
import InfoCardItem from "src/layouts/utils/ui/InfoCardItem.jsx";
import DescriptionEditor from "src/layouts/utils/ui/DescriptionEditor.jsx";
import theme from "src/theme/theme.jsx";
import UserAvatar from "src/layouts/utils/ui/UserAvatar.jsx";

const BoosterProfileInfo = ({balance, totalIncome, totalTips, gameTags, numberOfCompletedOrders}) => {

    const dispatch = useDispatch();
    const userAvatarFromStore = useSelector(selectAvatar);
    const usernameFromStore = useSelector(selectUsername);
    const descriptionProfileFromStore = useSelector(selectDescription);
    const emailFromStore = useSelector(selectEmail);
    const secondIdFromStore = useSelector(selectSecondId);

    const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
    const [userName, setUserName] = useState(usernameFromStore);
    const [descriptionProfile, setDescriptionProfile] = useState(descriptionProfileFromStore);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const handleNameSave = async (newName) => {
        try {
            await changeNickname(newName);
            setUserName(newName);
            dispatch(setUsername(newName));
            setIsEditingName(false);
        } catch (error) {
            console.log(handleApiError(error));
        }
    };

    const handleNameCancel = () => {
        setIsEditingName(false);
    };

    const handleDescriptionSave = async (newDescription) => {
        try {
            await changeDescriptionProfile(newDescription);
            setDescriptionProfile(newDescription);
            dispatch(setDescription(newDescription));
            setIsEditingDescription(false);
        } catch (error) {
            console.log(handleApiError(error));
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
            padding: 3,
            height: 'fit-content',
            backgroundColor: theme.palette.background.paper,
        }}>
            <Box sx={{display: 'flex', alignItems: 'start', mb: 3}}>

                <UserAvatar
                    src={userAvatar}
                    size={200}
                    onAvatarClick={() => console.log('Avatar clicked')}
                    onFileChange={handleAvatarChange}
                />

                <Box sx={{paddingInline: 10, display: 'flex', flex: 1, flexDirection: 'column', gap: 1}}>
                    <Box sx={{mt: 2, gap: 1}}>
                        {isEditingName ? (
                            <UsernameEditor
                                initialName={userName}
                                onSave={handleNameSave}
                                onCancel={handleNameCancel}
                            />
                        ) : (
                            <UsernameInfoItem
                                value={userName}
                                setIsEditingName={setIsEditingName}
                                copyable={true}
                            />
                        )}
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 5}}>
                        <ProfileInfoItem label="ID" value={secondIdFromStore}/>
                        <ProfileInfoItem label="Email" value={emailFromStore} copyable={true}/>
                    </Box>

                    <Box sx={{
                        mt: 1,
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <InfoCardItem label='Available balance' value={`$ ${balance}`}/>
                        <InfoCardItem label='Complited orders' value={numberOfCompletedOrders}/>
                        <InfoCardItem label='Total income' value={`$ ${totalIncome}`}/>
                        <InfoCardItem label='Total tips' value={`$ ${totalTips}`}/>
                    </Box>

                    <BoosterGameTags gameTags={gameTags}/>

                    <Box sx={{mt: 2, width: '100%'}}>
                        {isEditingDescription ? (
                            <DescriptionEditor
                                initialDescription={descriptionProfile}
                                onSave={handleDescriptionSave}
                                onCancel={handleDescriptionCancel}
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

export default BoosterProfileInfo;