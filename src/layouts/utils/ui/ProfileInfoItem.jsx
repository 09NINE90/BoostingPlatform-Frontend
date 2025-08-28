import {useEffect, useState} from "react";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "src/theme/theme.jsx";

const ProfileInfoItem = ({label = null, value, copyable = false}) => {
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
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 0.5,
            height: '24px',
        }}>
            {label && (
                <Typography variant="body2"
                            sx={{
                                color: theme.palette.third.main,
                                fontWeight: theme.typography.fontWeightLight,
                                mr: 2,
                                lineHeight: '24px',
                                fontSize: {xs: '0.875rem', sm: '1rem'}
                            }}>
                    {label}:
                </Typography>
            )}
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight,
                            lineHeight: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: {xs: '0.875rem', sm: '1rem'},
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
                        size="medium"
                        onClick={handleCopy}
                        sx={{
                            p: 0.5,
                            ml: 1,
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary
                            }
                        }}
                    >
                        <ContentCopyIcon fontSize='small' color='third'/>
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    )
}

export default ProfileInfoItem;