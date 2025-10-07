import {NavLink} from "react-router-dom";
import theme from "src/theme/theme.jsx";
import {Box, keyframes} from "@mui/material";

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const FloatingBecomeBoosterButton = () => {
    return (
        <Box
            component={NavLink}
            to="/become/booster/default"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 9999,
                backgroundColor: theme.palette.third.main,
                color: 'white',
                px: 2,
                py: 1.25,
                textDecoration: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                fontSize: 14,
                fontWeight: theme.typography.fontWeightRegular,
                animation: `${pulse} 2.5s infinite`,
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: theme.palette.third.hover,
                },
            }}
        >
            Become booster
        </Box>
    );
};

export default FloatingBecomeBoosterButton;