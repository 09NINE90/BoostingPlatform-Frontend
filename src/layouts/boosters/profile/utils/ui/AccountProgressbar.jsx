import {LinearProgress, Tooltip} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";

const AccountProgressbar = ({progress}) => {
    return (
        <Tooltip title={progress + '%'}>
            <LinearProgress
                variant="buffer"
                value={progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.palette.secondary,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.primary
                    }
                }}
            />
        </Tooltip>
    )
}

export default AccountProgressbar;