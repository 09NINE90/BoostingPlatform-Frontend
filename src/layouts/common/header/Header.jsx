import {useSelector, useDispatch} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    AppBar,
    IconButton,
    useMediaQuery
} from '@mui/material';
import ProfileIcon from "../../../assets/icons/ProfileIcon.jsx";
import DropMenu from "src/layouts/common/header/utils/ui/DropMenu.jsx";
import {clearAuth, selectAuth, selectAvatar, selectRole, selectUsername} from "src/store/slice/authSlice.js";
import LogoHome from "src/layouts/common/header/utils/ui/LogoHome.jsx";
import Cart from "src/layouts/common/header/utils/ui/Cart.jsx";
import {toast} from "react-toastify";
import {SIGN_IN_STATE,} from "src/utils/constants/authForm.js";
import BoosterHeader from "src/layouts/boosters/BoosterHeader.jsx";
import {postLogout} from "src/services/authApi.js";
import {BOOSTER_ROLE, CUSTOMER_ROLE} from "src/utils/constants/roles.js";
import {AuthModal} from "src/components/authorization/AuthModal.jsx";
import MobileBottomNavigation from "src/layouts/common/header/utils/ui/MobileBottomNavigation.jsx";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {

    const isMobile = useMediaQuery('(max-width:1024px)');

    const role = useSelector(selectRole);
    const userAvatar = useSelector(selectAvatar);
    const forBoosterPage = role === BOOSTER_ROLE;

    const [anchorEl, setAnchorEl] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const profileRef = useRef(null);
    const [modelType, setModalType] = useState(SIGN_IN_STATE);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const username = useSelector(selectUsername);
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
        if (!forBoosterPage) navigate("/profile");
        else navigate("/booster/profile");
        handleProfileMenuClose();
    }, [navigate, handleProfileMenuClose])

    const handleLogout = useCallback(async () => {
        try {
            await postLogout();
            handleProfileMenuClose();
            dispatch(clearAuth());
            toast.success('Logout successfully');
        } catch (error) {
            toast.error(error.message);
        }

    }, [handleProfileMenuClose, dispatch]);

    const toggleModal = useCallback(() => {
        setModalIsOpen((prev) => !prev);
    }, [setModalIsOpen]);

    const renderModal = useMemo(() => {
        if (modalIsOpen) handleProfileMenuClose()
        return (
            <AuthModal
                modalIsOpen={modalIsOpen}
                toggleModal={toggleModal}
                modelType={modelType}
                setModalType={setModalType}
                handleProfileMenuClose={handleProfileMenuClose}
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
        <>
            <AppBar position='sticky' enableColorOnDark
                    sx={{
                        backgroundColor: 'background.paper',
                        backgroundImage: 'none',
                    }}
            >
                <div className="flex flex-row items-center justify-between px-5 py-2">
                    <div className="flex items-center gap-2">
                        <LogoHome forBoosterPage={forBoosterPage}/>
                        {/*{!forBoosterPage && !isMobile && (*/}
                        {/*    <Search/>*/}
                        {/*)}*/}
                    </div>
                    {!isMobile ? (
                        <>
                            {forBoosterPage && <BoosterHeader/>}
                            <nav className="flex justify-between flex-row text-center">
                                {!forBoosterPage && <Cart cartCount={cartCount}/>}

                                <div className="flex justify-center hover:scale-101" ref={profileRef}>
                                    <IconButton onClick={handleProfileClick}
                                                sx={{
                                                    transition: 'box-shadow 0.3s ease',
                                                    borderRadius: 0,
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: '0px 5px 10px 2px rgba(253, 152, 11, 0.2)',
                                                    }
                                                }}>
                                        <ProfileIcon className="w-[50px]"/>
                                        {username && (
                                            <div className="kanit-light text-xl ml-6">
                                                {username}
                                            </div>
                                        )}
                                    </IconButton>

                                    <DropMenu anchorEl={anchorEl}
                                              handleClose={handleProfileMenuClose}
                                              isAuthenticated={isAuthenticated}
                                              handleOpenProfile={handleOpenProfile}
                                              handleLogout={handleLogout}
                                              onOpen={toggleModal}/>
                                </div>
                            </nav>
                        </>
                    ) : (
                        <>
                            {!isAuthenticated ? (
                                    <div className="flex justify-center hover:scale-101" ref={profileRef}>
                                        <IconButton onClick={() => setModalIsOpen(true)}
                                                    sx={{
                                                        transition: 'box-shadow 0.3s ease',
                                                        borderRadius: 0,
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                            boxShadow: '0px 5px 10px 2px rgba(253, 152, 11, 0.2)',
                                                        }
                                                    }}>
                                            <ProfileIcon className="w-[50px]"/>
                                        </IconButton>
                                    </div>
                                )
                                : (
                                    <div className="flex justify-center">
                                        <IconButton onClick={() => handleLogout()}>
                                            <LogoutIcon/>
                                        </IconButton>
                                    </div>
                                )}
                        </>
                    )}
                </div>
                {renderModal}
            </AppBar>
            {isMobile && isAuthenticated && (
                <MobileBottomNavigation
                    isAuthenticated={isAuthenticated}
                    role={role}
                    cartCount={cartCount}
                />
            )}
        </>
    );
}

export default Header;