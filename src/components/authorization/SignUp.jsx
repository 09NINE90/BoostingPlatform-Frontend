import "../../styles/AuthForms.css";
import { useState } from "react";
import {setAuth, setRole} from "../../store/slice/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthStatus } from "../../store/slice/authSlice.js";
import { NavLink, useNavigate } from "react-router-dom";
import {postRegister} from "../../services/authApi.jsx";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import Alert from '@mui/material/Alert';

const SignUp = ({closeModal, signInRedirect}) => {

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [requredFieldEmpty, setRequredFieldEmpty] = useState(false);
    const [passwordFieldIsValid, setPasswordFieldIsValid] = useState(true);
    const [emailFieldIsValid, setEmailFieldIsValid] = useState(true);

    const status = useSelector(selectAuthStatus);
    const dispatch = useDispatch();

    const signUp = async () => {
        if(nickname != "" && confirmPassword != "") {
            try {
                if (password !== confirmPassword) {
                    setErrorMessage("Passwords do not match!");
                    return;
                }

                const credentials = {
                    username: email,
                    password: password,
                }

                const {roles} = await postRegister(credentials);
                if (roles) {
                    dispatch(setRole(roles));
                    dispatch(setAuth(true));
                    closeModal();
                }
            } catch(error) {
                console.log(error)
                setErrorMessage(error.response?.data || "An error occurred, please contact the administrator!");
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
        if(!isEmailValid) {
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
        if(!isPasswordValid) {
            setPasswordFieldIsValid(false);
        } else {
            setPasswordFieldIsValid(true);
        }
        setPassword(password);
    }

    return (
        <div className="items-center justify-center p-2">
            <div className="mb-4">By continuing, you agree to our&nbsp; 
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
            <div>
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
                { !passwordFieldIsValid ? 
                    <div className="text-[#f44336] text-sm">The minimum password length is 6. Must contain the letters digits and at least one special character.
                    </div> : null}
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
            <div className="flex flex-col items-start my-5">
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
                <Button className="w-2/3" variant="contained" color="secondary" onClick={signUp} loading={status === "loading"}>Sign Up</Button>
            </div>
        </div>
    );
};

export default SignUp;
