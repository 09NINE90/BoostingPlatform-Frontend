import {Box, Skeleton} from "@mui/material";
import theme from "src/theme/theme.jsx";

const ChatMessagesSkeleton = () => {
    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    my: 2,
                    position: 'relative',
                }}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: 120,
                        height: 32,
                        borderRadius: 16,
                        margin: '0 auto',
                        bgcolor: 'grey.400'
                    }}
                />
            </Box>

            {[...Array(3)].map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        mb: 2,
                        p: 2,
                        width: '60%',
                        maxWidth: "60%",
                        borderRadius: 2,
                        borderTopLeftRadius: 0,
                    }}
                >
                    {/* Имя отправителя */}
                    <Skeleton
                        variant="text"
                        width="40%"
                        height={20}
                        sx={{mb: 1}}
                    />

                    <Skeleton variant="text" width="90%" height={20} sx={{mb: 0.5}}/>
                    <Skeleton variant="text" width="70%" height={20} sx={{mb: 0.5}}/>
                    <Skeleton variant="text" width="50%" height={20} sx={{mb: 0.5}}/>

                    <Skeleton
                        variant="text"
                        width="25%"
                        height={16}
                        sx={{
                            mt: 1,
                            ml: 'auto'
                        }}
                    />
                </Box>
            ))}

            {[...Array(2)].map((_, index) => (
                <Box
                    key={`my-${index}`}
                    sx={{
                        mb: 2,
                        p: 2,
                        width: '60%',
                        maxWidth: "60%",
                        borderRadius: 2,
                        ml: "auto",
                        borderTopRightRadius: 0,
                        bgcolor: theme.palette.third.hover,
                    }}
                >
                    <Skeleton
                        variant="text"
                        width="80%"
                        height={20}
                        sx={{
                            mb: 0.5,
                            bgcolor: 'grey.300'
                        }}
                    />
                    <Skeleton
                        variant="text"
                        width="60%"
                        height={20}
                        sx={{
                            mb: 0.5,
                            bgcolor: 'grey.300'
                        }}
                    />

                    <Skeleton
                        variant="text"
                        width="25%"
                        height={16}
                        sx={{
                            mt: 1,
                            ml: 'auto',
                            bgcolor: 'grey.300'
                        }}
                    />
                </Box>
            ))}
        </>
    );
};

export default ChatMessagesSkeleton;