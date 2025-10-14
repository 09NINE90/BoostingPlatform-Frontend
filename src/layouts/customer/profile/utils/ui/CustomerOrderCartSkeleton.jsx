import {Box, Skeleton} from '@mui/material';
import theme from "src/theme/theme.jsx";

const CustomerOrderCartSkeleton = ({index}) => {
    return (
        <Box
            key={index}
            sx={{
                p: 4,
                mb: 4,
                position: "relative",
                backgroundColor: theme.palette.background.default,
            }}
        >
            <div className="flex justify-between items-start mb-3">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "90%",
                        gap: 2
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton variant="text" width={50} height={20}/>
                        <Skeleton variant="text" width="80%" height={24}/>
                    </Box>

                    <Skeleton variant="text" width={120} height={20}/>

                    <Box>
                        <Skeleton variant="text" width={70} height={18}/>
                        <Skeleton variant="text" width={150} height={24}/>
                    </Box>
                </Box>

                <Box
                    sx={{
                        gap: 3,
                        width: '150px',
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={32}
                        sx={{borderRadius: 1}}
                    />

                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        sx={{borderRadius: 1, mt: 2}}
                    />

                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        sx={{borderRadius: 1, mt: 2}}
                    />
                </Box>
            </div>

            <div className="mb-4">
                <Skeleton variant="text" width={40} height={18} sx={{mb: 1}}/>
                <Skeleton variant="text" width={180} height={24}/>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-background-paper">
                <Skeleton variant="text" width={80} height={32}/>
            </div>
        </Box>
    );
};

export default CustomerOrderCartSkeleton;