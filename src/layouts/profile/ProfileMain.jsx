import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    IconButton, Box, Typography, LinearProgress, Avatar, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
    selectAvatar,
    selectUsername,
    setUsername
} from "../../store/slice/authSlice.js";
import { changeNickname } from "src/services/userApi.jsx";
import { handleApiError } from "src/layouts/error/ErrorPage.jsx";
import OrderTable from "src/layouts/profile/OrderTable.jsx";

function ProfileMain() {
    const dispatch = useDispatch();
    const userAvatarFromStore = useSelector(selectAvatar);
    const usernameFromStore = useSelector(selectUsername);

    const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
    const [userName, setUserName] = useState(usernameFromStore);
    const [tempName, setTempName] = useState(usernameFromStore);
    const [isEditingName, setIsEditingName] = useState(false);
    const [totalSpent, setTotalSpent] = useState(0);
    const fileInputRef = useRef(null);

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

    const getCashbackLevel = () => {
        if (totalSpent >= 2000) {
            return { level: "Legend", percentage: 20, nextLevel: null, progress: 100 };
        } else if (totalSpent >= 1000) {
            return {
                level: "Hero",
                percentage: 15,
                nextLevel: "Legend",
                progress: ((totalSpent - 1000) / 1000) * 100
            };
        } else {
            return {
                level: "Explorer",
                percentage: 10,
                nextLevel: "Hero",
                progress: (totalSpent / 1000) * 100
            };
        }
    };

    const cashbackInfo = getCashbackLevel();

    return (
        <Box sx={{ padding: 3, display: 'flex', gap: 3 }}>
            <Box sx={{
                backgroundColor: '#1E1930',
                borderRadius: 2,
                padding: 3,
                width: 300,
                height: 'fit-content'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative' }}>
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
                            <PhotoCameraIcon sx={{ color: 'white' }} />
                        </Box>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isEditingName ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="bg-transparent text-white border border-gray-600 rounded px-2 py-1"
                                />
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
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
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    {userName}
                                </Typography>
                                <IconButton size="small" onClick={handleNameEdit}>
                                    <EditIcon sx={{ color: 'white', fontSize: 16 }} />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Box sx={{
                    backgroundColor: '#1E1930',
                    borderRadius: 2,
                    padding: 3,
                    marginBottom: 3,
                }}>
                    <Typography variant="h5" sx={{ color: '#fff', marginBottom: 2 }}>
                        Unlock higher cashback rewards as you level up!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', marginBottom: 1 }}>
                        Current Level: {cashbackInfo.level} • {cashbackInfo.percentage}% Cashback
                    </Typography>
                    {cashbackInfo.nextLevel && (
                        <>
                            <LinearProgress
                                variant="determinate"
                                value={cashbackInfo.progress}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#6a6ad8'
                                    }
                                }}
                            />
                            <Typography variant="body2" sx={{ color: '#fff', marginTop: 1 }}>
                                ${totalSpent} spent • Next level: {cashbackInfo.nextLevel}
                            </Typography>
                        </>
                    )}
                </Box>

                <Typography variant="h5" sx={{ color: '#fff', marginBottom: 2 }}>
                    Your Orders
                </Typography>
                <OrderTable />
            </Box>
        </Box>
    );
}

export default ProfileMain;
