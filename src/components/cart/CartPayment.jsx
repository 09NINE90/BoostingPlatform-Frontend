import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import theme from 'src/theme/theme.jsx';
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const CartPayment = ({cartItems, onProceed}) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalTime = cartItems.reduce((sum, item) => sum + item.totalTime, 0);

    return (
        <Box
            sx={{
                borderLeft: '1px solid ' + theme.palette.divider,
                pl: 2,
                minWidth: '15vw',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography variant="h6" sx={{mb: 2}}>
                    Total: {cartItems.length}
                </Typography>

                <List
                    dense
                    sx={{
                        maxHeight: '30vh',
                        overflowY: 'auto',
                        pr: 1,
                        mb: 2,
                    }}
                >
                    {cartItems.map((item, idx) => (
                        <ListItem key={idx} disableGutters sx={{alignItems: 'center', py: 0.5}}>
                            <ListItemIcon sx={{minWidth: 20, mt: 0.5}}>
                                <FiberManualRecordIcon
                                    sx={{fontSize: 10, color: theme.palette.third.main}}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box display="flex" gap={1}>
                                        <Typography
                                            sx={{color: theme.palette.text.primary, fontSize: 14}}
                                        >
                                            {item.offerName}:
                                        </Typography>
                                        <Typography
                                            sx={{color: theme.palette.text.secondary, fontSize: 14}}
                                        >
                                            ${item.totalPrice}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{mb: 2}}/>

                <Box display="flex" justifyContent="space-between" sx={{mb: 1}}>
                    <Typography variant="h6">
                        Total price:
                    </Typography>
                    <Typography variant="h6">
                        ${totalPrice}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" sx={{mb: 3}}>
                    <Typography variant="body2" sx={{color: theme.palette.text.secondary,}}>
                        Total time:
                    </Typography>
                    <Typography variant="body2" sx={{color: theme.palette.text.secondary,}}>
                        {totalTime} hours
                    </Typography>
                </Box>
            </Box>

            <ContainedBlueButton
                onClick={onProceed}
                fullWidth
                sx={{py: 1.5}}
            >
                Proceed to payment
            </ContainedBlueButton>
        </Box>
    );
};

export default CartPayment;
