import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {confirmEmail} from "src/services/authApi.jsx";
import {toast} from "react-toastify";
import {clearAuth, setAuth, setRole, setToken} from "src/store/slice/authSlice.js";
import {useDispatch} from "react-redux";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import {ClipLoader} from "react-spinners";

const EmailConfirmationPage = () => {

    const { tokenParam } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    console.log(tokenParam);

    useEffect(() => {
        const confirm = async () => {
            try {
                const confirmationToken = {
                    token: tokenParam,
                }
                const { role, token } = await confirmEmail(confirmationToken);
                dispatch(setToken(token));
                dispatch(setRole(role));
                dispatch(setAuth(true));
                setIsLoading(false);
                navigate('/');
                toast.success('Email confirmation successfully!');
            } catch (error) {
                dispatch(clearAuth());
                navigate('/');
                toast.error(handleApiError(error).message);
            }
        };
        confirm();
    }, [tokenParam, navigate]);

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center mt-[15vh]">
                    <ClipLoader color="#FD980B" size={50} cssOverride={{display: "block", margin: "auto auto"}}/>
                </div>
            )}
        </>
    )
}

export default EmailConfirmationPage;