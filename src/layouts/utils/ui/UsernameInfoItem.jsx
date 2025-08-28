import React, {useEffect, useState} from "react";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";

const UsernameInfoItem = ({value, setIsEditingName, copyable = false}) => {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = () => setOpen(false);
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleCopy = (e) => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        e.stopPropagation();
        setOpen((prev) => !prev);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, height: '40px'}}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                height: '100%'
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.primary,
                        fontWeight: theme.typography.fontWeightBold,
                        lineHeight: '1',
                        alignItems: 'center',
                    }}>
                    {value}
                </Typography>
                {copyable && (
                    <Tooltip
                        title="Copied!"
                        open={open && copied}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                    >
                        <IconButton
                            size="small"
                            onClick={handleCopy}
                            sx={{
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    color: theme.palette.primary
                                },
                                alignSelf: 'center'
                            }}
                        >
                            <ContentCopyIcon fontSize='small' color='third'/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Tooltip title="Edit username">
                <IconButton size="small"
                            onClick={() => setIsEditingName(true)}
                            sx={{
                                alignSelf: 'center'
                            }}>
                    <EditIcon color='third' fontSize='small'/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default UsernameInfoItem;