import {useState} from "react";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "src/theme/theme.jsx";

const ProfileInfoItem = ({label = null, value, copyable = false}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <Box sx={{display: 'flex', alignItems: 'center', mt: 0.5,  height: '24px' }}>
            {label && (
                <Typography variant="body2"
                            sx={{
                                color: theme.palette.third.main,
                                fontWeight: theme.typography.fontWeightLight,
                                mr: 2,
                                lineHeight: '24px'
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
                            alignItems: 'center'
                        }}>
                {value}
            </Typography>
            {copyable && (
                <Tooltip title={copied ? "Copied!" : "Copy"}>
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