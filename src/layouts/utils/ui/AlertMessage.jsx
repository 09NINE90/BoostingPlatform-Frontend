import Alert from "@mui/material/Alert";
import theme from "src/theme/theme.jsx";
import React from "react";

const AlertMessage = ({errorMessage, setErrorMessage}) => {
    if (errorMessage) {
        return (
            <Alert
                onClick={() => setErrorMessage(null)}
                severity="error"
                variant="filled"
                sx={{
                    mb: 3,
                    fontWeight: theme.typography.fontWeightLight,
                }}
            >
                {errorMessage}
            </Alert>
        )
    }
}

export default AlertMessage;