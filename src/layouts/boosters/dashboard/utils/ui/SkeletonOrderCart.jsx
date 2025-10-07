import Box from "@mui/material/Box";
import {Skeleton} from "@mui/material";
import SkeletonDashboardCart from "./SkeletonDashboardCart.jsx";

const SkeletonOrderCart = ({index}) => {
    return (
        <Box
            key={index}
            sx={{
                p: 2,
                mb: 3,
                boxShadow: 2,
                backgroundColor: theme.palette.background.paper,
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
                width="100%"
                height={1}
                sx={{
                    transform: 'none',
                    my: 2
                }}
            />

            <Box sx={{mb: 2}}>
                <Skeleton
                    variant="text"
                    width="70%"
                    height={20}
                    sx={{
                        transform: 'none',
                        mb: 1
                    }}
                />
                <Skeleton
                    variant="text"
                    width="65%"
                    height={20}
                    sx={{
                        transform: 'none',
                        mb: 1
                    }}
                />
                <Skeleton
                    variant="text"
                    width="55%"
                    height={20}
                    sx={{
                        transform: 'none',
                        mb: 1
                    }}
                />
            </Box>

            <Box sx={{mt: 'auto', display: 'flex', justifyContent: 'flex-end'}}>
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