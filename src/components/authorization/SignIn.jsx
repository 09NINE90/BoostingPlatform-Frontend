import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthStatus, setAuth, setRole} from "../../store/slice/authSlice.js";
import {postAuthenticated} from "../../services/authApi.jsx";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {NavLink } from "react-router";
import Alert from '@mui/material/Alert';

const SignIn = ({closeModal, signUpRedirect}) => {
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const [errorMessage, setErrorMessage] = useState(null);
    const [requredFieldEmpty, setRequredFieldEmpty] = useState(false);

    const dispatch = useDispatch();
    const status = useSelector(selectAuthStatus);

    const signIn = async () => {
        try {
            if(credentials["username"] != "" && credentials["password"] != "") {
                const {roles, token} = await postAuthenticated(credentials)

                if (token) {
                    dispatch(setRole(roles));
                    dispatch(setAuth(true));
                }
                closeModal();
            } else {
                setRequredFieldEmpty(true);
            }
        } catch (error) {
            setErrorMessage(error.response?.data || "An error occurred, please contact the administrator!");
        }
    }

    return (    
        <div className="flex flex-col justify-between">
            <div className="h-full items-center justify-between p-2">
                <p className="mb-5">By continuing, you agree to our&nbsp; 
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
                </p>
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
                <div className="mb-7">
                    <TextField
                        error={requredFieldEmpty}
                        required
                        label="Login"
                        variant="outlined"
                        value={credentials["username"]}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    />
                    <div className="form-field"/>
                    <TextField
                        error={requredFieldEmpty}
                        required
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={credentials["password"]}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter')
                                signIn();
                        }}
                    />
                    <div className="form-field"/>
                </div>
                <div className="w-full items-start">
                    <div className="flex w-full flex-col items-start my-5">
                        <div>
                            <NavLink 
                             className={"text-sky-400 hover:text-sky-700"}
                             >
                                Forgot password?
                            </NavLink>
                        </div>
                        <div>
                            New in V-Boosting?
                            <NavLink
                                className={"text-sky-400 hover:text-sky-700"}
                                onClick={signUpRedirect}
                            >
                                &nbsp;Sign Up
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <Button className="w-2/3" variant="contained" color="secondary" onClick={signIn} 
                    loading={status === "loading"}>Log In</Button>
            </div>
        </div>    
    );
};

export default SignIn;