import {useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {SIGN_IN_STATE, SIGN_UP_STATE} from "./constants/authForm.js";
import {AuthModal} from "../components/authorization/AuthModal.jsx";

export const AuthModalWrapper = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modelType, setModalType] = useState(SIGN_IN_STATE);
    const [referrerId, setReferrerId] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path === '/auth/signin') {
            setModalType(SIGN_IN_STATE);
            setModalIsOpen(true);
        } else if (path.startsWith('/auth/signup')) {
            const parts = path.split('/');
            const refId = parts[parts.length - 1] !== 'signup' ? parts[parts.length - 1] : null;
            setReferrerId(refId);
            setModalType(SIGN_UP_STATE);
            setModalIsOpen(true);
        } else {
            setModalIsOpen(false);
        }
    }, [location.pathname]);

    const toggleModal = useCallback(() => {
        setModalIsOpen((prev) => !prev);
    }, [setModalIsOpen]);

    return (
        <AuthModal
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
            modelType={modelType}
            setModalType={setModalType}
            handleProfileMenuClose={() => {}}
            referrerId={referrerId}
            viewCloseIcon={false}
        />
    );
};

export default AuthModalWrapper;