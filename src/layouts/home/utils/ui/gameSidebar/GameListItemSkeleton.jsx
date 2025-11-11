import {Box, Skeleton} from '@mui/material';
import {ListItem, ListItemText} from '@mui/material';

const GameListItemSkeleton = ({index}) => {
    return (
        <Box key={index}
             className="relative group mt-2.5 h-[50px]"
        >
            <Box className="absolute inset-0 bg-cover bg-center">
                <Skeleton
                    variant="rectangular"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
                <Box className="absolute inset-0
                               bg-gradient-to-r
                               from-[#190050] to-[#190050_80%,#8A5AFF1A_1%]
                               transition-all duration-300"/>
            </Box>

            <ListItem
                className="relative z-10 flex justify-between items-center bg-transparent h-[50px]"
            >
                <ListItemText
                    primary={
                        <Skeleton
                            variant="text"
                            sx={{
                                minWidth: '200px',
                                height: 28,
                                fontFamily: "'Kanit', sans-serif",
                                fontSize: '1.2rem',
                            }}
                        />
                    }
                />
            </ListItem>
        </Box>
    );
};

export default GameListItemSkeleton;