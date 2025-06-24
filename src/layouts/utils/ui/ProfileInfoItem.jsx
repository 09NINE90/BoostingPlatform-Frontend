import {useState} from "react";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ProfileInfoItem = ({label, value, copyable = false}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', mt: 1}}>
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightLight,
                            minWidth: 120
                        }}>
                {label}:
            </Typography>
            <Typography variant="body1"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight,
                        }}>
                {value}
            </Typography>
            {copyable && (
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                    <IconButton
                        size="medium"
                        onClick={handleCopy}
                        sx={{
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