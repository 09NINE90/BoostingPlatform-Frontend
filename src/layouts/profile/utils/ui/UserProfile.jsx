import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import React, {useRef, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch, useSelector} from "react-redux";
import {selectAvatar, selectUsername, setUsername} from "src/store/slice/authSlice.js";
import {changeNickname} from "src/services/userApi.js";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const UserProfile = () => {
    const dispatch = useDispatch();
    const userAvatarFromStore = useSelector(selectAvatar);
    const usernameFromStore = useSelector(selectUsername);

    const fileInputRef = useRef(null);

    const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
    const [userName, setUserName] = useState(usernameFromStore);
    const [tempName, setTempName] = useState(usernameFromStore);
    const [isEditingName, setIsEditingName] = useState(false);

    const handleNameEdit = () => setIsEditingName(true);

    const handleNameSave = async () => {
        setUserName(tempName);
        dispatch(setUsername(tempName));
        setIsEditingName(false);
        try {
            await changeNickname(tempName); // можно сохранить в переменную, если понадобится
        } catch (error) {
            console.log(handleApiError(error));
        }
    };

    const handleNameCancel = () => {
        setTempName(userName);
        setIsEditingName(false);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
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
            backgroundColor: '#1E1930',
            borderRadius: 2,
            padding: 3,
            width: 300,
            height: 'fit-content'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                <Box sx={{position: 'relative'}}>
                    <Avatar
                        src={userAvatar}
                        sx={{
                            width: 120,
                            height: 120,
                            cursor: 'pointer',
                            '&:hover .MuiBox-root': {
                                opacity: 1
                            }
                        }}
                        onClick={handleAvatarClick}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: '50%',
                            padding: 1,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        <PhotoCameraIcon sx={{color: 'white'}}/>
                    </Box>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        style={{display: 'none'}}
                    />
                </Box>
                <Box sx={{mt: 2, display: 'flex', alignItems: 'center', gap: 1}}>
                    {isEditingName ? (
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="bg-transparent text-white border border-gray-600 rounded px-2 py-1"
                            />
                            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleNameSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={handleNameCancel}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{color: '#fff'}}>
                                {userName}
                            </Typography>
                            <IconButton size="small" onClick={handleNameEdit}>
                                <EditIcon sx={{color: 'white', fontSize: 16}}/>
                            </IconButton>
                        </>
                    )}
                </Box>
            </Box>
        </Box>

    )
}

export default UserProfile;