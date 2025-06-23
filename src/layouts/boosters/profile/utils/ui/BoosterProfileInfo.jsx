import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAvatar, selectEmail, selectSecondId, selectUsername, setUsername} from "src/store/slice/authSlice.js";
import {changeNickname} from "src/services/userApi.js";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import BoosterAvatar from "src/layouts/boosters/profile/utils/ui/BoosterAvatar.jsx";
import BoosterNameEditor from "src/layouts/boosters/profile/utils/ui/BoosterNameEditor.jsx";
import BoosterProfileInfoItem from "src/layouts/boosters/profile/utils/ui/BoosterProfileInfoItem.jsx";

const BoosterProfileInfo = ({balance, totalIncome, totalTips}) => {

    const dispatch = useDispatch();
    const userAvatarFromStore = useSelector(selectAvatar);
    const usernameFromStore = useSelector(selectUsername);
    const emailFromStore = useSelector(selectEmail);
    const secondIdFromStore = useSelector(selectSecondId);

    const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
    const [userName, setUserName] = useState(usernameFromStore);

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

    return (
        <Box sx={{
            padding: 3,
            width: '25vw',
            height: 'fit-content'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', mb: 3}}>
                <BoosterAvatar
                    src={userAvatar}
                    size={200}
                    onAvatarClick={() => console.log('Avatar clicked')}
                    onFileChange={handleAvatarChange}
                />
                <Box sx={{p: 3}}>
                    <Box sx={{mt: 2, display: 'flex', alignItems: 'center', gap: 1}}>
                        {isEditingName ? (
                            <BoosterNameEditor
                                initialName={userName}
                                onSave={handleNameSave}
                                onCancel={handleNameCancel}
                            />
                        ) : (
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <BoosterProfileInfoItem label='Username' value={userName}/>
                                <IconButton size="small" onClick={() => setIsEditingName(true)}>
                                    <EditIcon sx={{color: 'white', fontSize: 16}}/>
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{mt: 3}}>
                        <BoosterProfileInfoItem label='Email' value={emailFromStore}/>
                        <BoosterProfileInfoItem label="ID" value={secondIdFromStore}/>
                        <BoosterProfileInfoItem label='Balance' value={`$ ${balance}`}/>
                        <BoosterProfileInfoItem label='Total income' value={`$ ${totalIncome}`}/>
                        <BoosterProfileInfoItem label='Total tips' value={`$ ${totalTips}`}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default BoosterProfileInfo;