import "../../styles/AuthForms.css";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectAuthStatus} from "../../store/slice/authSlice.js";
import {NavLink} from "react-router-dom";
import {postRegister} from "../../services/authApi.js";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import Alert from '@mui/material/Alert';
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import theme from "src/theme/theme.jsx";

const SignUp = ({closeModal, signInRedirect}) => {

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [requredFieldEmpty, setRequredFieldEmpty] = useState(false);
    const [passwordFieldIsValid, setPasswordFieldIsValid] = useState(true);
    const [emailFieldIsValid, setEmailFieldIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const status = useSelector(selectAuthStatus);

    const signUp = async () => {
        if (nickname !== "" && confirmPassword !== "") {
            try {
                setIsLoading(true);

                if (password !== confirmPassword) {
                    setErrorMessage("Passwords do not match!");
                    return;
                }

                const credentials = {
                    nickname: nickname,
                    email: email,
                    password: password
                }

                const message = await postRegister(credentials);

                closeModal();

                toast.success(message.confirmation + message.username);

            } catch (error) {
                const serverError = error.response?.data?.message
                setErrorMessage(serverError || "An error occurred, please contact the administrator!");
            }
        } else {
            setRequredFieldEmpty(true);
        }
    };

    const onChangeEmail = (email) => {
        const isEmailValid = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!isEmailValid) {
            setEmailFieldIsValid(false);
        } else {
            setEmailFieldIsValid(true);
        }
        setEmail(email);
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

    return (
        <>
            {!isLoading && (
                <div className="flex flex-col justify-between">
                    <div className="h-full p-2 kanit-light">
                        By continuing, you agree to our&nbsp;
                        <NavLink
                            className={"text-sky-400 hover:text-sky-700"}
                            to="/"
                        >
                            User Agreement
                        </NavLink>
                        &nbsp;and acknowledge that you understand the&nbsp;
                        <NavLink
                            className={"text-sky-400 hover:text-sky-700"}
                            to="/"
                        >
                            Privacy Policy
                        </NavLink>.
                    </div>
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
                            error={requredFieldEmpty}
                            required
                            sx={{my: 1}}
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            label="Nickname"
                        />
                        <TextField
                            error={!emailFieldIsValid || requredFieldEmpty}
                            required
                            sx={{my: 1}}
                            type="email"
                            value={email}
                            onChange={(e) => onChangeEmail(e.target.value)}
                            label="Email"
                        />
                        <TextField
                            error={!passwordFieldIsValid || errorMessage === "Passwords do not match!" || requredFieldEmpty}
                            required
                            sx={{my: 1}}
                            type="password"
                            value={password}
                            onChange={(e) => onChangePassword(e.target.value)}
                            label="Password"
                        />
                        {!passwordFieldIsValid ?
                            <div className="text-[#f44336] text-sm kanit-light">
                                The minimum password length is 6. Must contain the
                                letters digits and at least one special character.
                            </div>
                            : null
                        }
                        <TextField
                            error={requredFieldEmpty || errorMessage === "Passwords do not match!"}
                            required
                            sx={{mt: 1}}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Confirm Password"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter')
                                    signUp();
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-start my-5 gap-2 kanit-light">
                        <div>
                            Already have account?
                            <NavLink
                                className={"text-sky-400 hover:text-sky-700"}
                                onClick={signInRedirect}
                            >
                                &nbsp;Sign In
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <Button
                            className="w-2/3"
                                variant="contained"
                                color="primary"
                                onClick={signUp}
                                loading={status === "loading"}
                                sx={{fontWeight: theme.typography.fontWeightLight}}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="flex justify-center items-center mt-[15vh]">
                    <ClipLoader color="#FD980B" size={50} cssOverride={{display: "block", margin: "auto auto"}}/>
                </div>
            )}
        </>
    );
};

export default SignUp;
