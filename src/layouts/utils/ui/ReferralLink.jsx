import Box from "@mui/material/Box";
import {IconButton, Skeleton, Tooltip, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, {useMemo, useState} from "react";
import theme from "../../../theme/theme.jsx";

const ReferralLink = ({referralLink, isLoading}) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const renderLink = useMemo(() => {
        if (isLoading) {
            return (
                <Skeleton
                    variant="text"
                    width="100%"
                    height={24}
                    sx={{
                        transform: 'none',
                        fontFamily: 'monospace',
                        flex: 1
                    }}
                />
            )
        }

        return (
            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'monospace',
                    color: theme.palette.text.primary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1
                }}
            >
                {referralLink}
            </Typography>
        )
    }, [isLoading, referralLink]);

    return (
        <Box>
            <Typography variant="body1" sx={{mb: 3, color: theme.palette.text.secondary}}>
                Share your referral link with friends and earn rewards
            </Typography>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                mb: 3,
                backgroundColor: theme.palette.action.hover,
                borderRadius: 1,
                maxWidth: {xs: 300, sm: 400, md: 500},
            }}>
                {renderLink}

                <Tooltip title={copied ? "Copied!" : "Copy link"}>
                    <IconButton
                        size="small"
                        onClick={handleCopy}
                        color={copied ? "success" : "default"}
                        sx={{
                            color: copied ? theme.palette.success.main : theme.palette.text.secondary
                        }}
                    >
                        {copied ? <CheckIcon fontSize="small"/> : <ContentCopyIcon fontSize="small"/>}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default ReferralLink;