import styles from '../../styles/Header.module.css'
import {useSelector, useDispatch} from "react-redux";
import { selectAuth, selectRole, clearAuth, selectAvatar } from "../../store/slice/authSlice.js";
import { useState } from "react";
import {useNavigate, Link, NavLink} from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, IconButton, Menu, MenuItem, Avatar, ListItemIcon } from '@mui/material';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SignIn from "../../components/authorization/SignIn.jsx";
import SignUp from "../../components/authorization/SignUp.jsx";
import ModalTemplate from "../../utils/modalTemplate/ModalTemplate.jsx";
import logo from "../../assets/logo.png"
import {BOOSTER_ROLE} from "../../utils/constants/roles.js"

const Header = ({forBoosterPage}) => {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modelType, setModalType] = useState("signin");
    const [cartCount, setCartCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const isAuthenticated = useSelector(selectAuth);
    const role = useSelector(selectRole);
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState(useSelector(selectAvatar));

    const handleProfileClick = (event) => {
        if(isAuthenticated){
            setAnchorEl(event.currentTarget);
        } else {
            setModalIsOpen(true);
        }
    };

    const handleBoosterProfileNavigate = () => {
        handleMenuClose();
        navigate("/booster/profile");
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileNavigate = () => {
        handleMenuClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        handleMenuClose();
        dispatch(clearAuth());

    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    const navButton = (path, title) => {
        return(
            <NavLink
                to={path}
                className={"px-5"}
            >
                <p className="">{title}</p>
            </NavLink>
        )
    };

    const renderModal = () => {
        return (
            <ModalTemplate
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                content={
                    modelType === "signin" ? 
                        <SignIn
                            closeModal={() => setModalIsOpen(false)}
                            signUpRedirect={() => setModalType("signup")}
                         /> : 
                        <SignUp
                            closeModal={() => setModalIsOpen(false)}
                            signInRedirect={() => setModalType("signin")}
                        />
                }
            />
        )
    };

    return (
        <AppBar position='static' color="bgColor" enableColorOnDark>
            <div className="flex flex-row items-center justify-between px-5 py-2">
                <Link color='secondary' to="/">
                    <div className={styles.logo}>
                        <img className="w-15" src={logo} alt="Logo" />
                    </div>
                </Link>
                { !forBoosterPage ?
                    (<FormControl className="bg-conic-900 max-w-md w-full mx-4" variant="standard">
                        <Input
                            id="search_field"
                            fullWidth
                            placeholder="Search services..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon color='secondary' />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    ) : (
                        <div className="flex items-center justify-between">
                            {navButton("/booster/dashboard", "Dashboard")}
                            {navButton("/booster/orders", "My Orders")}
                        </div>
                    )
                }
                <nav className="flex justify-between flex-row" >
                   <div className="px-4 justify-center items-center">
                        <Badge badgeContent={cartCount} color="primary">
                            <IconButton onClick={handleCartClick}  sx={{ width: 48, height: 48 }}>
                                <ShoppingCartIcon color='secondary'/>
                            </IconButton>
                        </Badge>
                    </div>
                    <div className="px-4">
                        {isAuthenticated ? (
                            <>
                                <IconButton onClick={handleProfileClick}> 
                                    {userAvatar ? (
                                        <Avatar 
                                            src={userAvatar} 
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    ) : (
                                        <PersonIcon color='secondary'/>
                                    )}
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleProfileNavigate}>
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" />
                                        </ListItemIcon>
                                        Profile
                                    </MenuItem>
                                    { (role == BOOSTER_ROLE) && 
                                        <MenuItem onClick={handleBoosterProfileNavigate}>
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" />
                                        </ListItemIcon>
                                        Booster Profile
                                    </MenuItem>
                                    }
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button 
                                sx={{ borderRadius: '25px' }} 
                                variant="contained" 
                                onClick={handleProfileClick}
                            >
                                Sign In
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
            {renderModal()}
        </AppBar>
    );
}

export default Header;