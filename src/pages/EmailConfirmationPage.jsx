import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {confirmEmail} from "src/services/authApi.jsx";
import {toast} from "react-toastify";
import {
    clearAuth,
    setAuth,
    setAvatar,
    setCountCartItems,
    setRole,
    setToken,
    setUsername
} from "src/store/slice/authSlice.js";
import {useDispatch} from "react-redux";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import {ClipLoader} from "react-spinners";
import {getUserProfileData} from "src/services/userApi.jsx";
import {getCountCartItemsApi} from "src/services/offerApi.jsx";
import {Navigate} from "react-router-dom";

const EmailConfirmationPage = () => {

    const {tokenParam} = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const isConfirmed = useRef(false);

    useEffect(() => {
        if (isConfirmed.current) return;
        isConfirmed.current = true;

        const confirm = async () => {
            try {
                const confirmationToken = {
                    token: tokenParam,
                }
                const {role, token} = await confirmEmail(confirmationToken);
                dispatch(setToken(token));
                dispatch(setRole(role));
                dispatch(setAuth(true));

                const userProfile = await getUserProfileData();
                dispatch(setUsername(userProfile.nickname));
                dispatch(setAvatar(userProfile.imageUrl));

                const countCartItems = await getCountCartItemsApi();
                dispatch(setCountCartItems(countCartItems));

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