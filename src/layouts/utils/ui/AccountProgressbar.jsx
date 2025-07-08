import {LinearProgress, Tooltip} from "@mui/material";
import theme from "src/theme/theme.jsx";
import React from "react";

const AccountProgressbar = ({progress}) => {
    return (
        <Tooltip title={progress + '%'}>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    transition: 'transform 0.4s linear',
                    backgroundColor: theme.palette.third.hover,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.third.main,
                        borderRadius: 5
                    },
                }}
            />
        </Tooltip>
    )
}

export default AccountProgressbar;