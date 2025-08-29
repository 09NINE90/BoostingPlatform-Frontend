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
import UserAvatar from "src/layouts/utils/ui/UserAvatar.jsx";
import InfoCardsGroup from "src/layouts/utils/ui/InfoCardsGroup.jsx";
import InfoCardsContainer from "src/layouts/utils/ui/InfoCardsContainer.jsx";
import ProfileInfoGroup from "src/layouts/utils/ui/ProfileInfoGroup.jsx";
import ProfileContainer from "src/layouts/utils/ui/ProfileContainer.jsx";

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
        <ProfileContainer>
            <Box mt={{xs: 2, md: 6}} ml={{xs: 0, md: 6}}>
                <UserAvatar
                    src={userAvatar}
                    size={200}
                    onAvatarClick={() => console.log('Avatar clicked')}
                    onFileChange={handleAvatarChange}
                />
            </Box>


            <Box sx={{
                paddingInline: {xs: 2, sm: 5, md: 10},
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                gap: 1,
                width: {xs: '100%', md: 'auto'}
            }}>
                <Box sx={{mt: {xs: 2, sm: 2}, gap: 1}}>
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

                <ProfileInfoGroup>
                    <ProfileInfoItem label="ID" value={secondIdFromStore}/>
                    <ProfileInfoItem label="Email" value={emailFromStore} copyable={true}/>
                </ProfileInfoGroup>

                <InfoCardsContainer>
                    <InfoCardsGroup>
                        <InfoCardItem label='Available balance' value={`$ ${balance}`}/>
                        <InfoCardItem label='Complited orders' value={numberOfCompletedOrders}/>
                    </InfoCardsGroup>
                    <InfoCardsGroup>
                        <InfoCardItem label='Total income' value={`$ ${totalIncome}`}/>
                        <InfoCardItem label='Total tips' value={`$ ${totalTips}`}/>
                    </InfoCardsGroup>
                </InfoCardsContainer>

                <BoosterGameTags gameTags={gameTags}/>

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
        </ProfileContainer>
    )
}

export default BoosterProfileInfo;