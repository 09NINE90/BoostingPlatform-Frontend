import {useSelector, useDispatch} from "react-redux";
import {selectAuth, selectRole, selectAvatar  } from "../../store/slice/authSlice.js";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import SignIn from "../../components/authorization/SignIn.jsx";
import SignUp from "../../components/authorization/SignUp.jsx";
import ModalTemplate from "../../utils/modalTemplate/ModalTemplate.jsx";
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import {AppBar, IconButton} from '@mui/material';
import Badge from '@mui/material/Badge';
import ProfileIcon from "src/assets/profile.svg";
import CartIcon from "src/assets/cart.svg";
import Logo from "../../assets/logo-footer.svg";
import SearchIcon from 'src/assets/search_icon.svg';


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

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate("/profile");
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

    const renderModal = () => (
        <ModalTemplate
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            title={modelType === "signin" ? "Sign In" : "Sign Up"}
            content={
                modelType === "signin" ?
                    <SignIn
                        closeModal={() => setModalIsOpen(false)}
                        signUpRedirect={() => setModalType("signup")}
                    />
                    :
                    <SignUp
                        closeModal={() => setModalIsOpen(false)}
                        signInRedirect={() => setModalType("signin")}
                    />
            }
        />
    );

    return (
        <AppBar position='sticky' enableColorOnDark
                sx={{
                    backgroundColor: 'background.paper',
                    backgroundImage: 'none',
                }}
        >
            <div className="flex flex-row items-center justify-between px-5 py-2">
                <div className="flex items-center">
                    <Link color='secondary' to="/" className="mr-10">
                        <div className={Logo}>
                            <img className="w-[50px]" src={Logo}/>
                        </div>
                    </Link>

                    <div className="relative w-[25vw]">
                        <input
                            id="search_field"
                            type="text"
                            placeholder="Find an offer"
                            className="w-full bg-conic-900 text-[#00A0FF]/80 placeholder-[#004772]/80 border-b border-[#00A0FF] focus:outline-none focus:border-b-2 focus:border-[#00A0FF] hover:border-b-2 pl-10 py-2 kanit-light"
                        />
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-105">
                            <img src={SearchIcon} alt="Search Icon" />
                        </div>
                    </div>

                </div>

                <nav className="flex justify-between flex-row">
                    <div className="px-4 hover:scale-103">
                        <Badge badgeContent={cartCount}>
                            <IconButton onClick={handleCartClick}>
                                <img src={CartIcon} className="w-[50px]" alt="cart"/>
                            </IconButton>
                        </Badge>
                    </div>
                    <div className="px-4 hover:scale-103">
                        <IconButton onClick={handleProfileClick}>
                            <img src={ProfileIcon} className="w-[50px]" alt="profile"/>
                        </IconButton>
                    </div>
                </nav>
            </div>
            {renderModal()}
        </AppBar>
    );
}

export default Header;