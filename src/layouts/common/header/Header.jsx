import {useSelector, useDispatch} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import SignIn from "../../../components/authorization/SignIn.jsx";
import SignUp from "../../../components/authorization/SignUp.jsx";
import ModalTemplate from "../../../utils/modalTemplate/ModalTemplate.jsx";
import {AppBar, IconButton} from '@mui/material';
import ProfileIcon from "../../../assets/icons/ProfileIcon.jsx";
import DropMenu from "src/layouts/common/header/utils/ui/DropMenu.jsx";
import {clearAuth, selectAuth, selectAvatar, selectRole} from "src/store/slice/authSlice.js";
import Search from "src/layouts/common/header/utils/ui/Search.jsx";
import LogoHome from "src/layouts/common/header/utils/ui/LogoHome.jsx";
import Cart from "src/layouts/common/header/utils/ui/Cart.jsx";

const Header = ({forBoosterPage}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const profileRef = useRef(null);
    const [modelType, setModalType] = useState("signin");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const role = useSelector(selectRole);
    const [userAvatar, setUserAvatar] = useState(useSelector(selectAvatar));

    const isAuthenticated = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfileClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl])

    const handleProfileMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const handleOpenProfile = useCallback(() => {
        navigate("/profile");
    }, [navigate])

    const handleLogout = useCallback(() => {
        handleProfileMenuClose();
        dispatch(clearAuth());
    }, [handleProfileMenuClose, dispatch]);

    const toggleModal = useCallback(() => {
        setModalIsOpen((prev) => !prev);
    }, [setModalIsOpen]);

    const handleBoosterProfileNavigate = useCallback(() => {
        handleProfileMenuClose();
        navigate("/booster/profile");
    }, []);


    const handleProfileNavigate = useCallback(() => {
        handleProfileMenuClose();
        navigate("/profile");
    }, [handleProfileMenuClose, navigate]);

    const renderModal = useMemo(() => {
        if (modalIsOpen) handleProfileMenuClose()
        return (
            <ModalTemplate
                isOpen={modalIsOpen}
                onClose={toggleModal}
                title={modelType === "signin" ? "Sign In" : "Sign Up"}
                content={
                    modelType === "signin" ?
                        <SignIn
                            closeModal={toggleModal}
                            signUpRedirect={() => setModalType("signup")}
                        />
                        :
                        <SignUp
                            closeModal={toggleModal}
                            signInRedirect={() => setModalType("signin")}
                        />
                }
            />
        )
    }, [modalIsOpen, toggleModal, modelType, setModalType])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                handleProfileMenuClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AppBar position='sticky' enableColorOnDark
                sx={{
                    backgroundColor: 'background.paper',
                    backgroundImage: 'none',
                }}
        >
            <div className="flex flex-row items-center justify-between px-5 py-2">
                <div className="flex items-center">
                    <LogoHome/>
                    <Search/>
                </div>

                <nav className="flex justify-between flex-row">
                    <Cart cartCount={cartCount} />
                    <div className="px-4 hover:scale-103">
                        <IconButton onClick={handleProfileClick}>
                            <ProfileIcon className="w-[50px]"/>
                        </IconButton>
                        <DropMenu anchorEl={anchorEl}
                                  handleClose={handleProfileMenuClose}
                                  isAuthenticated={isAuthenticated}
                                  handleOpenProfile={handleOpenProfile}
                                  handleLogout={handleLogout}
                                  onOpen={toggleModal}/>
                    </div>
                </nav>
            </div>
            {renderModal}
        </AppBar>
    );
}

export default Header;