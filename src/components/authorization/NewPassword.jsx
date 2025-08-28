import React, {useState} from "react";
import Alert from "@mui/material/Alert";
import {TextField} from "@mui/material";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import {
    clearAuth,
    setAuth,
    setAvatar,
    setCountCartItems, setDescription,
    setEmail,
    setRole, setSecondId,
    setToken,
    setUsername
} from "src/store/slice/authSlice.js";
import {BOOSTER_ROLE, CUSTOMER_ROLE} from "src/utils/constants/roles.js";
import {getBoosterProfileData, getCustomerProfileData} from "src/services/userApi.js";
import {getCountCartItemsApi} from "src/services/offerApi.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router";
import {changePassword} from "src/services/authApi.js";
import HiddenFieldWithShowIcon from "src/components/common/HiddenFieldWithShowIcon.jsx";

const NewPassword = ({closeModal, signInRedirect, currentEmail}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fieldEmail, setFieldEmail] = useState(currentEmail);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [requiredFieldEmpty, setRequiredFieldEmpty] = useState(false);
    const [passwordFieldIsValid, setPasswordFieldIsValid] = useState(true);
    const [emailFieldIsValid, setEmailFieldIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const setProfile = (profile) => {
        dispatch(setUsername(profile.nickname));
        dispatch(setAvatar(profile.imageUrl));
        dispatch(setEmail(profile.email))
        dispatch(setSecondId(profile.secondId));
        dispatch(setDescription(profile.description));
    }

    const handleChangePassword = async () => {
        if (fieldEmail === '' || password === '' || confirmPassword === '') {
            setRequiredFieldEmpty(true)
        }
        setIsLoading(true)
        try {
            const request = {
                email: fieldEmail,
                password: password
            }
            const {role, token} = await changePassword(request);

            dispatch(setToken(token));
            dispatch(setRole(role));
            dispatch(setAuth(true));

            if (role === CUSTOMER_ROLE) {
                const profile = await getCustomerProfileData();
                const countCartItems = await getCountCartItemsApi();

                setProfile(profile)
                dispatch(setCountCartItems(countCartItems));

            } else if (role === BOOSTER_ROLE) {
                const profile = await getBoosterProfileData();

                setProfile(profile)
                navigate('/booster/dashboard')
            }

            toast.success('Sign in successfully');
            closeModal();
        } catch (err) {
            dispatch(clearAuth());
            const serverError = err.response?.data?.message

            setErrorMessage(serverError)
        } finally {
            setIsLoading(false)
        }
    }

    const onChangeEmail = (fieldEmail) => {
        const isEmailValid = String(fieldEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!isEmailValid) {
            setEmailFieldIsValid(false);
        } else {
            setEmailFieldIsValid(true);
        }
        setFieldEmail(fieldEmail);
    }

    const onChangePassword = (password) => {
        const isPasswordValid = String(password)
            .toLowerCase()
            .match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,40}$/);
        if (!isPasswordValid) {
            setPasswordFieldIsValid(false);
        } else {
            setPasswordFieldIsValid(true);
        }
        setPassword(password);
    }

    const linkClass = "text-sky-400 hover:text-sky-700";

    return (
        <div className="flex flex-col justify-between">
            {
                errorMessage &&
                <Alert
                    onClick={() => setErrorMessage(null)}
                    className="my-4"
                    severity="error"
                    variant="filled"
                >
                    {errorMessage}
                </Alert>
            }
            <div className="mb-2 flex flex-col gap-2">
                <TextField
                    disabled={true}
                    error={!emailFieldIsValid || requiredFieldEmpty}
                    required
                    sx={{my: 1}}
                    type="email"
                    value={fieldEmail}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    label="Email"
                />
                <HiddenFieldWithShowIcon
                    error={!passwordFieldIsValid || errorMessage === "Passwords do not match!" || requiredFieldEmpty}
                    required
                    sx={{my: 1}}
                    type="password"
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                    label="New password"
                />
                {!passwordFieldIsValid ?
                    <div className="text-[#f44336] text-sm kanit-light">
                        The minimum password length is 6. Must contain the
                        letters digits and at least one special character.
                    </div>
                    : null
                }
                <HiddenFieldWithShowIcon
                    error={requiredFieldEmpty || errorMessage === "Passwords do not match!"}
                    required
                    sx={{mt: 1}}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm new password"
                    onKeyDown={(event) => {
                        if (event.key === 'Enter')
                            handleChangePassword();
                    }}
                />
            </div>
            <div className="flex flex-col items-start my-5 gap-2 kanit-light">
                <NavLink className={linkClass} onClick={signInRedirect}>Sign in</NavLink>
            </div>
            <div>
                <ContainedBlueButton
                    loading={isLoading}
                    variant="contained"
                    onClick={() => handleChangePassword()}
                    sx={{py: 2, width: '100%'}}
                >
                    Change password
                </ContainedBlueButton>
            </div>
        </div>
    );
}

export default NewPassword;