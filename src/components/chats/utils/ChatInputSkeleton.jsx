import {Box, Skeleton} from "@mui/material";

const ChatInputSkeleton = () => {
    return (
        <Box>
            <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                <Skeleton
                    variant="rectangular"
                    sx={{
                        flex: 1,
                        height: 40,
                        borderRadius: 1,
                    }}
                />

                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: 100,
                        height: 40,
                        borderRadius: 1,
                    }}
                />
            </Box>

            <Box sx={{mt: 1, ml: 0.5}}>
                <Skeleton variant="text" width="80%" height={16}/>
                <Skeleton variant="text" width="60%" height={16} sx={{mt: 0.5}}/>
            </Box>
        </Box>
    );
};

export default ChatInputSkeleton;