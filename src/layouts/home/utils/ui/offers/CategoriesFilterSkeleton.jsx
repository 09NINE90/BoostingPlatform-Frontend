import { Box, Skeleton } from '@mui/material';

const CategoriesFilterSkeleton = () => {
    return (
        <Box
            sx={{
                gap: 1,
                display: 'flex',
                flexWrap: 'wrap',
                overflowX: 'auto',
                mb: 3,
            }}
        >
            <Skeleton
                variant="rectangular"
                sx={{
                    flexShrink: 0,
                    width: 120,
                    height: 32,
                    borderRadius: '16px'
                }}
            />

            {[...Array(6)].map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{
                        flexShrink: 0,
                        width: 100,
                        height: 32,
                        borderRadius: '16px'
                    }}
                />
            ))}
        </Box>
    );
};

export default CategoriesFilterSkeleton;