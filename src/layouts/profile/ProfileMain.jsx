import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IconButton, Box, Typography, LinearProgress, Avatar, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
    selectAvatar,
    selectUsername,
    setUsername,
    setAvatar
} from "../../store/slice/authSlice.js";
import {changeNickname} from "src/services/userApi.jsx";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";

function ProfileMain() {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [isEditingName, setIsEditingName] = useState(false);
    const [userName, setUserName] = useState(useSelector(selectUsername));
    const [tempName, setTempName] = useState(userName);
    const fileInputRef = useRef(null);
    const [userAvatar, setUserAvatar] = useState(useSelector(selectAvatar));

    const getMyOrders = () => {
        return [
            {
                uuid: "123141",
                orderId: "1",
                platform: "PC",
                name: "Dark matter Camo",
                status: "Completed",
                estimateDate: "20.05.2025",
                price: "100"
            },
            {
                uuid: "213445",
                orderId: "2",
                platform: "PS5",
                name: "Dark matter Camo",
                status: "In Progress",
                estimateDate: "20.05.2025",
                price: "200"
            },
            {
                uuid: "124361",
                orderId: "3",
                platform: "PS4",
                name: "Dark matter Camo",
                status: "Completed",
                estimateDate: "20.05.2025",
                price: "300"
            },
        ];
    };

    React.useEffect(() => {
        const orders = getMyOrders();
        setOrders(orders);
        const total = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
        setTotalSpent(total);
    }, []);

    const handleNameEdit = () => {
        setIsEditingName(true);
    };

    const handleNameSave = async () => {
        setUserName(tempName);
        dispatch(setUsername(tempName));
        setIsEditingName(false);
        try {
            const tempNameApi = await changeNickname(tempName)
        }catch(error) {
            console.log(handleApiError(error))
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
            //todo кидать запрос на бэк
            const reader = new FileReader();
            reader.onloadend = () => {
                // Dispatch action для обновления аватарки в Redux
                console.log("Avatar uploaded:", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getCashbackLevel = () => {
        if (totalSpent >= 2000) return {level: "Legend", percentage: 20, nextLevel: null, progress: 100};
        if (totalSpent >= 1000) return {
            level: "Hero",
            percentage: 15,
            nextLevel: "Legend",
            progress: (totalSpent - 1000) / 10
        };
        if (totalSpent >= 0) return {level: "Explorer", percentage: 10, nextLevel: "Hero", progress: totalSpent / 10};
        return {level: "Explorer", percentage: 10, nextLevel: "Hero", progress: 0};
    };

    const cashbackInfo = getCashbackLevel();

    return (
        <Box sx={{height: '100%', padding: 3, display: 'flex', gap: 3}}>
            {/* User Info Block */}
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

            {/* Main Content */}
            <Box sx={{flex: 1}}>
                {/* Cashback Block */}
                <Box sx={{
                    backgroundColor: '#1E1930',
                    borderRadius: 2,
                    padding: 3,
                    marginBottom: 3,
                }}>
                    <Typography variant="h5" sx={{color: '#fff', marginBottom: 2}}>
                        Unlock higher cashback rewards as you level up!
                    </Typography>
                    <Typography variant="body1" sx={{color: '#fff', marginBottom: 1}}>
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
                            <Typography variant="body2" sx={{color: '#fff', marginTop: 1}}>
                                ${totalSpent} spent • Next level: {cashbackInfo.nextLevel}
                            </Typography>
                        </>
                    )}
                </Box>

                {/* Orders List */}
                <Typography variant="h5" sx={{color: '#fff', marginBottom: 2}}>
                    Your Orders
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
                    {orders.map((order) => (
                        <Box key={order.uuid} sx={{
                            backgroundColor: '#1E1930',
                            borderRadius: 2,
                            padding: 2,
                            width: 280
                        }}>
                            <Typography variant="h6" sx={{color: '#fff', marginBottom: 1}}>
                                Order #{order.orderId}
                            </Typography>
                            <Box sx={{color: '#fff'}}>
                                <Typography variant="body2">Service: {order.name}</Typography>
                                <Typography variant="body2">Platform: {order.platform}</Typography>
                                <Typography variant="body2">Status: {order.status}</Typography>
                                <Typography variant="body2">Price: ${order.price}</Typography>
                                <Typography variant="body2">Estimate: {order.estimateDate}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default ProfileMain;