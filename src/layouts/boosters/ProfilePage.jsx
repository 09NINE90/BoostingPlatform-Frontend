import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Box, Typography, LinearProgress, Avatar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { clearAuth, setAuth, setRole, selectAvatar, selectUsername, setUsername } from "../../store/slice/authSlice.js";

const ProfileMain = () => {
    const dispatch = useDispatch();
    const [isEditingName, setIsEditingName] = useState(false);
    const [userAvatar, setUserAvatar] = useState(useSelector(selectAvatar));
    const [userName, setUserName] = useState(useSelector(selectUsername));
    const [tempName, setTempName] = useState(userName);
    const [profileInfo, setProfileInfo] = useState(null);
    const fileInputRef = useRef(null);

    const getProfileInfo = () => {
        return {
            totalEarn: 1000,
            totalTips: 50,
            ordersDone: 12,
            balance: 75
        }
    }

    React.useEffect(() => {
        const profileInfo = getProfileInfo();
        setProfileInfo(profileInfo);
        console.log(userName);
    }, []);

    const handleLogout = async () => {
        dispatch(setRole(''));
        dispatch(setAuth(false));
        dispatch(clearAuth());
    };

    const handleNameEdit = () => {
        setIsEditingName(true);
    };

    const handleNameSave = () => {
        setUserName(tempName);
        dispatch(setUsername(tempName));
        setIsEditingName(false);
        //todo прокинуть на бэкенд
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
            //todo кидать запрос на бэк
            const reader = new FileReader();
            reader.onloadend = () => {
                // Dispatch action для обновления аватарки в Redux
                console.log("Avatar uploaded:", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getAccountLevel = () => {
        if (profileInfo?.ordersDone >= 150) return { level: "Legend", percentage: 55, nextLevel: null, progress: 100 };
        if (profileInfo?.ordersDone >= 50) return { level: "Hero", percentage: 50, nextLevel: "Legend", progress: (profileInfo?.ordersDone - 50) / 10 };
        if (profileInfo?.ordersDone >= 0) return { level: "Explorer", percentage: 45, nextLevel: "Hero", progress: profileInfo?.ordersDone / 10 };
        return { level: "Explorer", percentage: 10, nextLevel: "Hero", progress: 0 };
    };

    const accountLevelInfo = getAccountLevel();

    return (
        <Box sx={{ height: '100%', padding: 3, display: 'flex', gap: 3 }}>
            {/* User Info Block */}
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
                                '&:hover': {
                                    '& .MuiBox-root': {
                                        opacity: 1
                                    }
                                }
                            }}
                            onClick={handleAvatarClick}
                        />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: '50%',
                            padding: 1,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            cursor: 'pointer'
                        }}>
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
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
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
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    {userName}
                                </Typography>
                                <IconButton size="small" onClick={handleNameEdit}>
                                    <EditIcon sx={{ color: 'white', fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        )}
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1 }}>
                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                Orders Done: {profileInfo?.ordersDone}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                Total Earn: {profileInfo?.totalEarn}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                Total Tips: {profileInfo?.totalTips}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                    backgroundColor: '#1E1930',
                    borderRadius: 2,
                    padding: 3,
                    marginBottom: 3,
                }}>
                    <Typography variant="h4" sx={{ color: '#fff', marginBottom: 2 }}>
                       Account Status
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', marginBottom: 1 }}>
                        Current Level: {accountLevelInfo.level} • {accountLevelInfo.percentage}% 
                    </Typography>
                    {accountLevelInfo.nextLevel && (
                        <>
                            <LinearProgress 
                                variant="determinate" 
                                value={accountLevelInfo.progress} 
                                sx={{ 
                                    height: 10, 
                                    borderRadius: 5,
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#6a6ad8'
                                    }
                                }} 
                            />
                        </>
                    )}
                </Box>

                {/* My Balance */}
                <Box sx={{ 
                    backgroundColor: '#1E1930',
                    borderRadius: 2,
                    padding: 3,
                    height: 'fit-content'
                }}>
                    <Typography variant="h4" sx={{ color: '#fff', marginBottom: 2 }}>
                        My Balance
                    </Typography>
                    <Box sx={{ mt:15, display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
                            ${profileInfo?.balance}
                        </Typography>
                        <Button variant="contained">
                            Withdrawal
                        </Button>
                    </Box>
                    <Box sx={{mt:10, display: 'flex', flexDirection: 'column'}}>
                        <a href="">How to get paid?</a>
                        <a href="">Payout methods</a>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ProfileMain;