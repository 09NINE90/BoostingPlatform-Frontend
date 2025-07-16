import {ClipLoader} from "react-spinners";
import React from "react";
import {Box} from "@mui/material";

const CenterLoader = ({size = 100, minHeight = '100vh'}) => {
    return(
        <Box
            sx={{
                minHeight: minHeight,
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