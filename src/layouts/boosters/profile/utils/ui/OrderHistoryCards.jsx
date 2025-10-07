import theme from "../../../../../theme/theme.jsx";
import Box from "@mui/material/Box";

const OrderHistoryCards = ({children}) => {

    return(
        <Box
            sx={{
                height: 250,
                py: 5,
                gap: 3,
                display: 'flex',
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: theme.palette.third.hover,
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '4px',
                    backgroundColor: theme.palette.third.main,
                },
            }}>
            {children}
        </Box>
    )
}

export default OrderHistoryCards;