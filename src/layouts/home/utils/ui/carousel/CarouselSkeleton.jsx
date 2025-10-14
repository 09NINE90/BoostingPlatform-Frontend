import {Box, Skeleton} from '@mui/material';

const CarouselSkeleton = () => {
    return (
        <div className="w-full max-w-[80vw] mx-auto px-4 mt-6 md-10 relative h-[300px] min-h-[300px]">
            <Skeleton
                variant="circular"
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 30,
                    width: 48,
                    height: 48,
                }}
            />

            <Skeleton
                variant="circular"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 30,
                    width: 48,
                    height: 48,
                }}
            />

            <Box
                className="h-[300px] relative"
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {[...Array(3)].map((_, index) => (
                    <Box
                        key={index}
                        className="!w-[500px] !h-[300px] relative overflow-hidden shadow-lg"
                        sx={{
                            flexShrink: 0,
                            position: 'relative'
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 0,
                            }}
                        />

                        <div
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A0022] via-[#0A0022b3] to-transparent z-10"
                        />

                        <Box className="relative z-20 flex flex-col h-full justify-end p-3">
                            <Skeleton
                                variant="text"
                                sx={{
                                    width: '60%',
                                    height: 32,
                                    mb: 1
                                }}
                            />

                            <Skeleton
                                variant="text"
                                sx={{
                                    width: '80%',
                                    height: 24,
                                    mb: 2
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default CarouselSkeleton;