import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {SIGN_IN_STATE, SIGN_UP_STATE} from "./constants/authForm.js";
import {AuthModal} from "../components/authorization/AuthModal.jsx";

export const AuthModalWrapper = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modelType, setModalType] = useState(SIGN_IN_STATE);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path === '/auth/signin') {
            setModalType(SIGN_IN_STATE);
            setModalIsOpen(true);
        } else if (path === '/auth/signup') {
            setModalType(SIGN_UP_STATE);
            setModalIsOpen(true);
        } else {
            setModalIsOpen(false);
        }
    }, [location]);

    const toggleModal = () => {
        setModalIsOpen(prev => !prev);
    };

    const handleProfileMenuClose = () => {
    };

    return (
        <AuthModal
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
            modelType={modelType}
            setModalType={setModalType}
            handleProfileMenuClose={handleProfileMenuClose}
        />
    );
};

export default AuthModalWrapper;