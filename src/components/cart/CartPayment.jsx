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

const CartPayment = ({cartItems, onProceed, loading}) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalTime = cartItems.reduce((sum, item) => sum + item.totalTime, 0);

    return (
        <Box
            sx={{
                borderTop: {xs: '1px solid ' + theme.palette.divider, lg: 'none'},
                borderLeft: {xs: 'none', lg: '1px solid ' + theme.palette.divider},
                pl: 2,
                width: {xs: '100%', lg: '17vw'},
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h6" sx={{mb: 2, mt: {xs: 2, lg: 0}}}>
                Total: {cartItems.length}
            </Typography>

            <Box sx={{flex: 1, overflowY: 'auto', mb: 2}}>
                <List
                    dense
                    sx={{
                        maxHeight: '100%',
                        overflowY: 'auto',
                        pr: 1,
                        mb: 2,
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: theme.palette.divider,
                            borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: theme.palette.primary.main,
                            borderRadius: '3px',
                            '&:hover': {
                                background: theme.palette.primary.main,
                            }
                        }
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
            </Box>

            <Box sx={{flexShrink: 0}}>
                <Divider sx={{mb: 2}}/>

                <Box display="flex" justifyContent="space-between" sx={{mb: 1}}>
                    <Typography variant="h6" sx={{fontWeight: theme.typography.fontWeightRegular}}>
                        Total price:
                    </Typography>
                    <Typography variant="h6" sx={{fontWeight: theme.typography.fontWeightRegular}}>
                        ${totalPrice}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" sx={{mb: 3}}>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular
                    }}>
                        Total time:
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular
                    }}>
                        {totalTime} hours
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                    <ContainedBlueButton
                        disabled={cartItems.length === 0}
                        loading={loading}
                        onClick={onProceed}
                        sx={{py: 1.5, width: '100%'}}
                    >
                        Proceed to payment
                    </ContainedBlueButton>
                </Box>
            </Box>
        </Box>
    );
};

export default CartPayment;
