import {useSelector} from "react-redux";
import {selectAuth} from "../../store/slice/authSlice.js";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import SignIn from "../../components/authorization/SignIn.jsx";
import SignUp from "../../components/authorization/SignUp.jsx";
import ModalTemplate from "../../utils/modalTemplate/ModalTemplate.jsx";
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import {AppBar, IconButton} from '@mui/material';
import Badge from '@mui/material/Badge';
import ProfileIcon from "src/assets/profile.svg"
import CartIcon from "src/assets/cart.svg"
import Logo from "../../assets/logo-footer.svg"


const Header = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modelType, setModalType] = useState("signin");
    const [cartCount, setCartCount] = useState(0);

    const isAuthenticated = useSelector(selectAuth);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate("/profile");
        } else {
            setModalIsOpen(true);
        }
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
                <Link color='secondary' to="/">
                    <div className={Logo}>
                        <img className="w-[50px]" src={Logo}/>
                    </div>
                </Link>
                <FormControl className="bg-conic-900" variant="standard">
                    <Input
                        id="search_field"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon color='secondary'/>
                            </InputAdornment>
                        }
                    />
                </FormControl>
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