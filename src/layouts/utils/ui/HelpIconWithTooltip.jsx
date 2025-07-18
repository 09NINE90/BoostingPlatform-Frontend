import HelpIcon from "@mui/icons-material/Help";
import theme from "src/theme/theme.jsx";
import {Tooltip} from "@mui/material";
import React from "react";

const HelpIconWithTooltip = ({tooltipTitle, sizeIcon = 'small', marginLeft = 0}) => {
    return (
        <Tooltip
            title={tooltipTitle}
        >
            <HelpIcon fontSize={sizeIcon}
                      sx={{
                          ml: marginLeft,
                          mr: marginLeft === 0 ? 1 : undefined,
                          color: theme.palette.divider,
                          '&:hover': {color: theme.palette.third.main}
                      }}/>
        </Tooltip>
    )
}

export default HelpIconWithTooltip;