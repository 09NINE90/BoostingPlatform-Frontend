import {Box, Chip, Skeleton, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import {isDeepEmpty} from "../../../utils/functions.js";
import React, {useMemo} from "react";

const InfoCardItem = ({label, value, isLoading}) => {

    const renderItemValue = useMemo(() => {
        if (isLoading) {
            return (
                <Skeleton
                    variant="text"
                    sx={{
                        width: '60%',
                        height: '100%',
                        transform: 'none',
                    }}
                />
            )
        }

        return (
            <Typography
                variant="h5"
                sx={{
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightMedium,
                    fontSize: { xs: '1rem', sm: '1.8rem' },
                    lineHeight: 1
                }}
            >
                {value}
            </Typography>
        )
    }, [isLoading, value]);

    return (
        <Box sx={{
            gap: { xs: 1, lg: 5 },
            flex: 1,
            p: { xs: 2, lg: 4 },
            minHeight: { xs: 'auto', sm: '120px' },
            width: { xs: '100%', sm: 'auto' },
            paddingInline: { xs: 2, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: {xs: 'center', lg: 'flex-start'},
            backgroundColor: theme.palette.background.default,
        }}>
            <Typography variant="h6"
                        sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightMedium,
                            fontSize: { xs: '1rem', sm: '1.5rem' }
                        }}>
                {label}
            </Typography>
            <Box sx={{
                height: { xs: 24, sm: 32 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: {xs: 'center', lg: 'flex-start'},
                width: '100%'
            }}>
                {renderItemValue}
            </Box>
        </Box>
    )
}

export default InfoCardItem;