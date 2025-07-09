import {ClipLoader} from "react-spinners";
import React from "react";
import {Box} from "@mui/material";

const CenterLoader = ({size = 100}) => {
    return(
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ClipLoader color="#FD980B" size={size} />
        </Box>
    )
}

export default CenterLoader;