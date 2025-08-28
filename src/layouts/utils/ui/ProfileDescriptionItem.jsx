import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const ProfileDescriptionItem = ({label, value, setIsEditingDescription}) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: '100%'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mt: 2,
                position: 'relative'
            }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        alignSelf: 'flex-start',
                    }}>
                    {label}:
                </Typography>
                <Typography variant="body2"
                            sx={{
                                mt: 2,
                                whiteSpace: 'pre-line',
                                color: theme.palette.text.primary,
                                fontWeight: theme.typography.fontWeightLight,
                                maxWidth: '100%'
                            }}>
                    {value}
                </Typography>
            </Box>
            <Tooltip title="Edit description">
                <IconButton size="small" onClick={() => setIsEditingDescription(true)}>
                    <EditIcon color='third' fontSize='small'/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default ProfileDescriptionItem;