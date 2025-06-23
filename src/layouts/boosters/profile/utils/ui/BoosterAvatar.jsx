import {Avatar, Box} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import React, {useRef} from "react";

const BoosterAvatar = ({src, size = 120, onAvatarClick, onFileChange}) => {
    const fileInputRef = useRef(null);


    return (
        <Box sx={{ position: 'relative' }}>
            <Avatar
                src={src}
                sx={{
                    width: size,
                    height: size,
                    cursor: 'pointer',
                    '&:hover': {
                        '& .MuiBox-root': {
                            opacity: 1
                        }
                    }
                }}
                onClick={onAvatarClick}
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
                onChange={onFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </Box>
    )
}

export default BoosterAvatar;