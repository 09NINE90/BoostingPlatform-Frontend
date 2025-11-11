import React, {useEffect, useMemo, useState} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import {
    FORGOT_PASSWORD_STATE,
    FORGOT_PASSWORD_TEXT, NEW_PASSWORD_STATE,
    NEW_PASSWORD_TEXT,
    SIGN_IN_STATE,
    SIGN_IN_TEXT, SIGN_UP_STATE,
    SIGN_UP_TEXT
} from "src/utils/constants/authForm.js";
import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";

export const AuthModal = ({
                              modalIsOpen,
                              toggleModal,
                              modelType,
                              setModalType,
                              handleProfileMenuClose,
                              referrerId,
                              viewCloseIcon
                          }) => {
    const [currentEmail, setCurrentEmail] = useState(null);

    const getModalTitle = () => {
        const titles = {
            SIGN_IN_STATE: SIGN_IN_TEXT,
            SIGN_UP_STATE: SIGN_UP_TEXT,
            FORGOT_PASSWORD_STATE: FORGOT_PASSWORD_TEXT,
            NEW_PASSWORD_STATE: NEW_PASSWORD_TEXT
        };
        return titles[modelType] || '';
    };

    const renderModalContent = useMemo(() => {
            switch (modelType) {
                case SIGN_IN_STATE:
                    return (
                        <SignIn
                            closeModal={toggleModal}
                            signUpRedirect={() => setModalType(SIGN_UP_STATE)}
                            forgotPasswordRedirect={() => setModalType(FORGOT_PASSWORD_STATE)}
                        />
                    );
                case SIGN_UP_STATE:
                    return (
                        <SignUp
                            closeModal={toggleModal}
                            signInRedirect={() => setModalType(SIGN_IN_STATE)}
                            referrerId={referrerId}
                        />
                    );
                case FORGOT_PASSWORD_STATE:
                    return (
                        <ForgotPassword
                            setCurrentEmail={setCurrentEmail}
                            signInRedirect={() => setModalType(SIGN_IN_STATE)}
                            newPasswordRedirect={() => setModalType(NEW_PASSWORD_STATE)}
                        />
                    );
                case NEW_PASSWORD_STATE:
                    return (
                        <NewPassword
                            currentEmail={currentEmail}
                            closeModal={toggleModal}
                            signInRedirect={() => setModalType(SIGN_IN_STATE)}
                        />
                    );
                default:
                    return null;
            }
        }, [modelType, toggleModal, modelType, setModalType, currentEmail, setCurrentEmail]
    );

    useEffect(() => {
        if (modalIsOpen) handleProfileMenuClose?.();
    }, []);

    return (
        <ModalTemplate
            isOpen={modalIsOpen}
            onClose={toggleModal}
            title={getModalTitle()}
            content={renderModalContent}
            viewCloseIcon={viewCloseIcon}
        />
    );
};