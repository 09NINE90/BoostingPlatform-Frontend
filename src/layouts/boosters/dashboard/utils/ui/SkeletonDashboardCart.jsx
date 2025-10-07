import theme from "../../../../../theme/theme.jsx";
import {Box, Skeleton} from "@mui/material";
import React from "react";

const SkeletonDashboardCart = ({index}) => {

    return (
        <Box
            key={index}
            sx={{
                mb: 3,
                p: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 2,
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                <Skeleton
                    variant="text"
                    width="60%"
                    height={32}
                    sx={{transform: 'none'}}
                />
                <Skeleton
                    variant="rounded"
                    width={80}
                    height={32}
                    sx={{
                        transform: 'none',
                        borderRadius: 16
                    }}
                />
            </Box>

            <Skeleton
                variant="text"
                width="40%"
                height={24}
                sx={{
                    transform: 'none',
                    mb: 1
                }}
            />

            <Skeleton
                variant="text"
                width="50%"
                height={20}
                sx={{
                    transform: 'none',
                    mb: 0.5
                }}
            />

            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <Skeleton
                    variant="text"
                    width="45%"
                    height={20}
                    sx={{
                        transform: 'none',
                        mr: 1
                    }}
                />
                <Skeleton
                    variant="circular"
                    width={20}
                    height={20}
                    sx={{transform: 'none'}}
                />
            </Box>

            <Skeleton
                variant="text"
                width="70%"
                height={20}
                sx={{
                    transform: 'none',
                    mb: 2
                }}
            />

            <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                <Skeleton
                    variant="rounded"
                    width={150}
                    height={36}
                    sx={{
                        transform: 'none',
                        borderRadius: 1
                    }}
                />
            </Box>
        </Box>
    )
}

export default SkeletonDashboardCart;