import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    clearAuth,
    selectAuthStatus,
    setAuth,
    setAvatar,
    setCountCartItems,
    setRole,
    setUsername,
    setToken,
    setEmail,
    setSecondId, setDescription,
} from "../../store/slice/authSlice.js";
import {postAuthenticated} from "../../services/authApi.js";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {NavLink, useNavigate} from "react-router";
import Alert from '@mui/material/Alert';
import {toast} from "react-toastify";
import {getBoosterProfileData, getCustomerProfileData} from "src/services/userApi.js";
import {getCountCartItemsApi} from "src/services/offerApi.js";
import {ClipLoader} from "react-spinners";
import {BOOSTER_ROLE, CUSTOMER_ROLE} from "src/utils/constants/roles.js";
import theme from "src/theme/theme.jsx";

const SignIn = ({closeModal, signUpRedirect}) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState(null);
    const [requiredFieldEmpty, setRequiredFieldEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectAuthStatus);

    const setProfile = (profile) => {
        dispatch(setUsername(profile.nickname));
        dispatch(setAvatar(profile.imageUrl));
        dispatch(setEmail(profile.email))
        dispatch(setSecondId(profile.secondId));
        dispatch(setDescription(profile.description));
    }

    const signIn = async () => {
        try {
            setIsLoading(true);

            if (!credentials.email.trim() || !credentials.password.trim()) {
                setRequiredFieldEmpty(true);
                return;
            }

            const {role, token} = await postAuthenticated(credentials);

            if (!token) {
                throw new Error('Токен не был получен');
            }
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

        } catch (error) {
            dispatch(clearAuth());
            const serverError = error.response?.data?.message

            setErrorMessage(serverError || "Произошла ошибка. Пожалуйста, попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    const linkClass = "text-sky-400 hover:text-sky-700";

    return (
        <>
            <div className="flex flex-col justify-between">
                <div className="h-full p-2">
                    <p className="mb-5 kanit-light">
                        By continuing, you agree to our&nbsp;
                        <NavLink to="/" className={linkClass}>
                            User Agreement
                        </NavLink>
                        &nbsp;and acknowledge that you understand the&nbsp;
                        <NavLink to="/" className={linkClass}>
                            Privacy Policy
                        </NavLink>.
                    </p>

                    {errorMessage && (
                        <Alert
                            onClick={() => setErrorMessage(null)}
                            className="my-4"
                            severity="error"
                            variant="filled"
                            sx={{fontWeight: theme.typography.fontWeightLight}}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    <div className="mb-7 flex flex-col gap-4">
                        <TextField
                            error={requiredFieldEmpty}
                            required
                            label="Login"
                            variant="outlined"
                            value={credentials.email}
                            onChange={(e) =>
                                setCredentials({...credentials, email: e.target.value})
                            }
                        />
                        <TextField
                            error={requiredFieldEmpty}
                            required
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({...credentials, password: e.target.value})
                            }
                            onKeyDown={(e) => e.key === "Enter" && signIn()}
                        />
                    </div>

                    <div className="flex flex-col items-start my-5 gap-2 kanit-light">
                        <NavLink className={linkClass}>Forgot password?</NavLink>
                        <div>
                            New in V-Boosting?
                            <NavLink className={linkClass} onClick={signUpRedirect}>
                                &nbsp;Sign Up
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <Button
                        loading={isLoading}
                        className="w-2/3"
                        variant="contained"
                        color="primary"
                        onClick={signIn}
                        sx={{
                            py: 2,
                            width: '100%',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightLight,
                            '&:hover': {
                                backgroundColor: theme.palette.third.hover,
                            }
                        }}
                    >
                        Log In
                    </Button>
                </div>
            </div>
        </>

    );
};

export default SignIn;