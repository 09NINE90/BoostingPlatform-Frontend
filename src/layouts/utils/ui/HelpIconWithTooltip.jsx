import HelpIcon from "@mui/icons-material/Help";
import theme from "src/theme/theme.jsx";
import {Tooltip} from "@mui/material";
import React from "react";

const HelpIconWithTooltip = ({tooltipTitle, sizeIcon = 'small'}) => {
    return (
        <Tooltip
            title={tooltipTitle}
        >
            <HelpIcon fontSize={sizeIcon}
                      sx={{
                          mr: 1,
                          color: theme.palette.divider,
                          '&:hover': {color: theme.palette.third.main}
                      }}/>
        </Tooltip>
    )
}

export default HelpIconWithTooltip;