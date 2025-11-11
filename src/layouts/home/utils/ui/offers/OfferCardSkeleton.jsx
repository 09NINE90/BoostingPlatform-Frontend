import {Box, Skeleton} from '@mui/material';

const OfferCardSkeleton = ({index}) => {
    return (
        <Box
            key={index}
            sx={{
                position: 'relative',
                width: {xs: '90vw', md: 300},
                maxWidth: {xs: 380, md: 300},
                height: {xs: '90vw', md: 300},
                maxHeight: {xs: 380, md: 300},
                aspectRatio: '1/1',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                margin: {xs: '0 auto', sm: 0},
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
                    zIndex: 0
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, #0A0022, #0A0022b3, #0A002200)',
                    zIndex: 10
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Skeleton
                    variant="text"
                    sx={{
                        mb: 1,
                        height: 32,
                    }}
                />

                <Skeleton
                    variant="text"
                    sx={{
                        mb: 2,
                        width: '95%',
                        height: 24,
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <Skeleton
                        variant="text"
                        sx={{
                            width: 60,
                            height: 28,
                        }}
                    />

                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: 90,
                            height: 40,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default OfferCardSkeleton;
