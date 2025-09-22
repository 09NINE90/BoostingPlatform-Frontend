import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {confirmEmail} from "src/services/authApi.js";
import {toast} from "react-toastify";
import {
    clearAuth,
    setAuth,
    setAvatar,
    setCountCartItems, setDescription,
    setEmail,
    setRole,
    setSecondId,
    setToken,
    setUsername
} from "src/store/slice/authSlice.js";
import {useDispatch} from "react-redux";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {ClipLoader} from "react-spinners";
import {getBoosterProfileData, getCustomerProfileData} from "src/services/userApi.js";
import {getCountCartItemsApi} from "src/services/offerApi.js";
import {Navigate} from "react-router-dom";
import {BOOSTER_ROLE, CUSTOMER_ROLE} from "src/utils/constants/roles.js";

const EmailConfirmationPage = () => {
    const navigate = useNavigate();
    const {tokenParam} = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const isConfirmed = useRef(false);

    const setProfile = (profile) => {
        dispatch(setUsername(profile.nickname));
        dispatch(setAvatar(profile.imageUrl));
        dispatch(setEmail(profile.email))
        dispatch(setSecondId(profile.secondId));
        dispatch(setDescription(profile.description));
    }

    useEffect(() => {
        if (isConfirmed.current) return;
        isConfirmed.current = true;

        const confirm = async () => {
            try {
                const {role, token} = await confirmEmail(tokenParam);
                dispatch(setToken(token));
                dispatch(setRole(role));
                dispatch(setAuth(true));

                if (role === CUSTOMER_ROLE) {
                    try {
                        const profile = await getCustomerProfileData();
                        const countCartItems = await getCountCartItemsApi();
                        dispatch(setCountCartItems(countCartItems));
                        setProfile(profile);
                    } catch (err) {
                        toast.error(handleApiError(err).message);
                    }

                } else if (role === BOOSTER_ROLE) {
                    try {
                        const profile = await getBoosterProfileData();
                        setProfile(profile);
                        navigate('/booster/dashboard')
                    } catch (err) {
                        toast.error(handleApiError(err).message);
                    }
                }

                setIsLoading(false);
                toast.success('Email confirmation successfully!');
            } catch (error) {
                dispatch(clearAuth());
                toast.error(handleApiError(error).message);
            }
        };
        confirm();
    }, [tokenParam]);

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center mt-[15vh]">
                    <ClipLoader color="#FD980B" size={50} cssOverride={{display: "block", margin: "auto auto"}}/>
                </div>
            )}
            {!isLoading && (
                <Navigate to="/LoE" replace/>
            )}
        </>
    )
}

export default EmailConfirmationPage;