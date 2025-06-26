import React, {useRef} from "react";
import {Box} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const UserAvatar = ({src, size = 120, onAvatarClick, onFileChange}) => {
    const fileInputRef = useRef(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
        if (onAvatarClick) onAvatarClick();
    };

    return (
        <Box sx={{position: 'relative', display: 'inline-block', mt: 6, ml: 6}}>
            <Box
                component="img"
                src={src}
                sx={{
                    width: size,
                    height: size,
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 10px #0ff, 0 0 20px rgba(0, 255, 255, 0.5)',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderRadius: 0,
                    '&:hover .hover-edit-icon': {
                        opacity: 1
                    },
                    transition: 'box-shadow 0.3s ease'
                }}
                onClick={handleAvatarClick}
            />

            <Box
                className="hover-edit-icon"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: 1,
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <PhotoCameraIcon sx={{color: 'white', fontSize: '1.2rem'}}/>
            </Box>

            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/*"
                style={{display: 'none'}}
            />
        </Box>
    );
}

export default UserAvatar;