import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Checkbox
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import theme from 'src/theme/theme.jsx';
import {deleteCartItem} from "src/services/offerApi.js";
import {selectCountCartItems, setCountCartItems} from "src/store/slice/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

const CartItems = ({item, onRemoveItem}) => {

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const dispatch = useDispatch();
    const countCartItems = useSelector(selectCountCartItems);

    const deleteItem = async (item) => {
        setIsDeleteLoading(true)
        try {
            await deleteCartItem(item.id);
            dispatch(setCountCartItems(countCartItems - 1));
            onRemoveItem(item.id);
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleteLoading(false)
        }
    }

    return (
        <Box
            key={item.offerId}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                p: 2,
                backgroundColor: theme.palette.background.default,
                border: '2px solid #2a206a',
            }}
        >
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="h6" sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightMedium
                        }}>
                            {item.offerName} in {item.gameName}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightMedium,
                            textAlign: 'left'
                        }}
                    >
                        {item.gamePlatform.name}
                    </Typography>
                </Box>

                <Box mt={1}>
                    {item.selectedOptions && item.selectedOptions.length > 0 ? (
                        <>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: theme.typography.fontWeightRegular,
                                    mb: 1
                                }}
                            >
                                Additional options:
                            </Typography>
                            <List dense>
                                {item.selectedOptions.map((option, idx) => (
                                    <ListItem key={idx} sx={{pl: 0}}>
                                        <ListItemIcon sx={{minWidth: 24}}>
                                            <FiberManualRecordIcon
                                                sx={{
                                                    fontSize: 10,
                                                    color: theme.palette.third.main,
                                                    mt: '4px',
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: theme.typography.fontWeightRegular,
                                                        color: theme.palette.text.primary,
                                                    }}>
                                                    {option.optionTitle}:
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontWeight: theme.typography.fontWeightRegular,
                                                            color: theme.palette.text.secondary,
                                                            ml: 1
                                                        }}
                                                    >
                                                        {option.label}
                                                    </Typography>
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    ) : (
                        <Typography variant="subtitle2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontWeight: theme.typography.fontWeightRegular,
                                    }}>
                            Without additional options
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{ml: 2}}
            >
                <Typography variant="h5"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: theme.typography.fontWeightRegular,
                            }}>
                    $ {item.totalPrice}
                </Typography>
                <Button
                    variant="contained"
                    loading={isDeleteLoading}
                    onClick={() => deleteItem(item)}
                    sx={{
                        mt: 2,
                        borderRadius: 0,
                        backgroundColor: '#e53935',
                        fontWeight: theme.typography.fontWeightRegular,
                        '&:hover': {
                            backgroundColor: '#a82828',
                        },
                    }}
                >
                    Remove
                </Button>
            </Box>
        </Box>
    );
};

export default CartItems;
