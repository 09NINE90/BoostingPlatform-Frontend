import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {confirmEmail} from "src/services/authApi.js";
import {toast} from "react-toastify";
import {
    clearAuth,
    setAuth,
    setAvatar,
    setBoosterBalance,
    setBoosterLevel,
    setBoosterPercentageOfOrder,
    setBoosterTotalIncome,
    setBoosterTotalTips,
    setCountCartItems,
    setCustomerCashbackBalance,
    setCustomerDiscountPercentage,
    setCustomerStatus,
    setEmail,
    setRole,
    setSecondId,
    setToken,
    setUsername
} from "src/store/slice/authSlice.js";
import {useDispatch} from "react-redux";
import {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import {ClipLoader} from "react-spinners";
import {getBoosterProfileData, getCustomerProfileData} from "src/services/userApi.js";
import {getCountCartItemsApi} from "src/services/offerApi.js";
import {Navigate} from "react-router-dom";
import {BOOSTER_ROLE, CUSTOMER_ROLE} from "src/utils/constants/roles.js";

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

                if (role === CUSTOMER_ROLE) {
                    const profile = await getCustomerProfileData();
                    const countCartItems = await getCountCartItemsApi();

                    dispatch(setCountCartItems(countCartItems));
                    dispatch(setUsername(profile.nickname));
                    dispatch(setAvatar(profile.imageUrl));
                    dispatch(setEmail(profile.email));
                    dispatch(setSecondId(profile.secondId));
                    dispatch(setCustomerStatus(profile.status));
                    dispatch(setCustomerCashbackBalance(profile.cashbackBalance));
                    dispatch(setCustomerDiscountPercentage(profile.discountPercentage));
                } else if (role === BOOSTER_ROLE) {
                    const profile = await getBoosterProfileData();

                    dispatch(setUsername(profile.nickname));
                    dispatch(setAvatar(profile.imageUrl));
                    dispatch(setEmail(profile.email))
                    dispatch(setBoosterLevel(profile.level));
                    dispatch(setBoosterPercentageOfOrder(profile.percentageOfOrder));
                    dispatch(setBoosterBalance(profile.balance));
                    dispatch(setBoosterTotalIncome(profile.totalIncome));
                    dispatch(setBoosterTotalTips(profile.totalTips));

                    navigate('/booster/dashboard')
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