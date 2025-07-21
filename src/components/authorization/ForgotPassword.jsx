import {NavLink} from "react-router";
import Alert from "@mui/material/Alert";
import theme from "src/theme/theme.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import {handleApiError} from "src/components/error/ErrorPage.jsx";
import {resetPassword, resetPasswordValidate} from "src/services/authApi.js";
import {toast} from "react-toastify";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";

const ForgotPassword = ({signInRedirect, newPasswordRedirect, setCurrentEmail}) => {

    const [credentials, setCredentials] = useState({email: "", confirmationCode: ""});
    const [requiredEmailFieldEmpty, setRequiredEmailFieldEmpty] = useState(false);
    const [requiredCodeFieldEmpty, setRequiredCodeFieldEmpty] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const getConfirmationCode = async () => {
        if (!credentials.email.trim()) {
            setRequiredEmailFieldEmpty(true);
            return;
        }
        setIsLoading1(true)
        try {
            const request = {
                email: credentials.email
            }
            await resetPassword(request);
            toast.success(`Confirmation code successfully send on email ${credentials.email}`)
        } catch (err) {
            setErrorMessage(handleApiError(err))
        } finally {
            setIsLoading1(false)
        }
    }

    const sentConfirmationCode = async () => {
        if (!credentials.email.trim()) {
            setRequiredEmailFieldEmpty(true);
            return;
        }
        if (!credentials.confirmationCode.trim()) {
            setRequiredCodeFieldEmpty(true);
            return;
        }
        setIsLoading2(true)
        try {
            const request = {
                email: credentials.email,
                code: credentials.confirmationCode
            }
            await resetPasswordValidate(request);
            setCurrentEmail(credentials.email.trim());
            newPasswordRedirect()
        } catch (err) {
            if (err.status === 400){
                setErrorMessage('The confirmation code was entered incorrectly.')

            } else {
                setErrorMessage(err.message)
            }
        } finally {
            setIsLoading2(false)
        }
    }

    const linkClass = "text-sky-400 hover:text-sky-700";

    return (
        <>
            <div className="flex flex-col justify-between">
                <div className="h-full p-2">
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
                </div>

                <div className="mb-2 flex flex-col gap-4">
                    <TextField
                        error={requiredEmailFieldEmpty}
                        required
                        label="Email"
                        type='email'
                        variant="outlined"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({...credentials, email: e.target.value})
                        }
                    />
                    <TextField
                        error={requiredCodeFieldEmpty}
                        required
                        label="Confirmation code"
                        variant="outlined"
                        type="text"
                        value={credentials.confirmationCode}
                        onChange={(e) =>
                            setCredentials({...credentials, confirmationCode: e.target.value})
                        }
                        onKeyDown={(e) => e.key === "Enter" && signIn()}
                    />
                </div>
                <div className="flex flex-col items-start my-5 gap-2 kanit-light">
                    <div>
                        Back on
                        <NavLink className={linkClass} onClick={signInRedirect}>
                            &nbsp;Sign in
                        </NavLink>
                    </div>
                </div>

                <div className="relative">
                    <ContainedBlueButton
                        loading={isLoading1}
                        variant="contained"
                        onClick={() => getConfirmationCode()}
                        sx={{py: 2, width: '100%',}}
                    >
                        Get code
                    </ContainedBlueButton>
                    <OutlinedBlueButton
                        loading={isLoading2}
                        onClick={() => sentConfirmationCode()}
                        sx={{mt: 2, py: 2, width: '100%',}}
                    >
                        confirm code
                    </OutlinedBlueButton>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;