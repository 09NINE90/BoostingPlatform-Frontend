import {FaBoxOpen} from 'react-icons/fa';
import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";

const EmptyResponse = ({text}) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                overflow: 'hidden',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
            <Typography variant="body2"
                        fontSize={30}
                        color={theme.palette.third.main}
                        fontWeight={theme.typography.fontWeightMedium}
            >
                {text.toUpperCase()}
            </Typography>
            <FaBoxOpen className="text-8xl text-gray-400 opacity-90 w-100"/>
            <Typography variant="body2"
                        fontSize={16}
                        color={theme.palette.text.secondary}
                        fontWeight={theme.typography.fontWeightLight}
            >
                Nothing was found for your search.
            </Typography>
        </Box>

    );
};

export default EmptyResponse;