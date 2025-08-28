import {
    BottomNavigation,
    BottomNavigationAction, Box,
    Paper, useMediaQuery,
} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {BOOSTER_ROLE} from 'src/utils/constants/roles';
import {useCallback, useState} from "react";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {getCartItemsApi} from "src/services/offerApi.js";
import DropCart from "src/components/cart/DropCart.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import CartModal from "src/components/cart/CartModal.jsx";

const MobileBottomNavigation = ({isAuthenticated, role}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width:1024px)');

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCartItems = useCallback(async () => {
        setLoading(true);
        try {
            const cartItemsApi = await getCartItemsApi();
            setCartItems(cartItemsApi);
            setError(null);
        } catch (err) {
            setCartItems([]);
            setError(handleApiError(err).status);
        } finally {
            setLoading(false);
        }
    }, [setCartItems, setLoading, setError, getCartItemsApi]);

    const handleOpenCart = async () => {
        setCartOpen(true);
        await fetchCartItems();
    };

    const handleCloseCart = () => setCartOpen(false);

    const boosterActions = [
        {label: 'Dashboard', icon: <DashboardIcon/>, path: '/booster/dashboard'},
        {label: 'Orders', icon: <AssignmentTurnedInIcon/>, path: '/booster/orders'},
        {label: 'Profile', icon: <AccountCircleIcon/>, path: '/booster/profile'},
        {label: 'Balance', icon: <AccountBalanceWalletIcon/>, path: '/booster/balanceHistory'},
    ];

    const customerActions = [
        {label: 'Home', icon: <HomeIcon/>, path: '/'},
        {label: 'Profile', icon: <AccountCircleIcon/>, path: '/profile'},
        {
            label: 'Cart',
            icon: <ShoppingBasketIcon/>,
            path: null,
            onClick: handleOpenCart,
        },
    ];

    const actions = isAuthenticated
        ? role === BOOSTER_ROLE
            ? boosterActions
            : customerActions
        : [{label: 'Sign In', icon: <AccountCircleIcon/>, path: '/auth'}];

    const currentIndex = actions.findIndex(a => a.path === location.pathname);

    return (
        <>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300, boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.3)',}} elevation={3}>
                <BottomNavigation
                    value={currentIndex === -1 ? 0 : currentIndex}
                    onChange={(event, newValue) => {
                        const selected = actions[newValue];
                        if (selected.path) {
                            navigate(selected.path);
                        } else if (selected.onClick) {
                            selected.onClick();
                        }
                    }}
                    showLabels
                >
                    {actions.map((action, index) => (
                        <BottomNavigationAction
                            key={index}
                            label={action.label}
                            icon={action.icon}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
            <DropCart
                anchorEl={cartOpen}
                handleClose={handleCloseCart}
                content={
                    <>
                        {error === 401 && (
                            <EmptyResponse text={'Log in to view the shopping cart'}/>
                        )}
                        {loading && !error && (
                            <Box sx={{minHeight: '100%', pt: '10%'}}>
                                <CustomLoader size={0.5} height='100%'/>
                            </Box>
                        )}
                        {!loading && !error && (
                            <CartModal
                                cartItems={cartItems}
                                onRemoveItem={(id) => setCartItems(prev => prev.filter(item => item.id !== id))}
                                onOrderComplete={(orderedIds) => setCartItems(prev => prev.filter(item => !orderedIds.includes(item.id)))}
                                isMobileDrawer={isMobile}
                            />
                        )}
                    </>
                }
            />
        </>
    );
};

export default MobileBottomNavigation;
