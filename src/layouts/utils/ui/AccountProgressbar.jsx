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
                    transition: 'transform 0.4s linear',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.third.main,
                        borderRadius: 5
                    },
                    '& .MuiLinearProgress-bar2Buffer': {
                        backgroundColor: theme.palette.third.hover
                    },

                }}
            />
        </Tooltip>
    )
}

export default AccountProgressbar;