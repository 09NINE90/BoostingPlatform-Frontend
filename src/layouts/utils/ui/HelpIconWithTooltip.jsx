import HelpIcon from "@mui/icons-material/Help";
import {IconButton, Tooltip} from "@mui/material";
import React, {useEffect, useState} from "react";
import theme from "src/theme/theme.jsx";

const HelpIconWithTooltip = ({tooltipTitle, sizeIcon = 'small', marginLeft = 0}) => {

    const [open, setOpen] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleOutsideClick = () => setOpen(false);
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);


    return (
        <Tooltip
            title={tooltipTitle}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            disableFocusListener
            disableHoverListener
            disableTouchListener
        >
            <IconButton
                onClick={handleClick}
                sx={{
                    ml: marginLeft,
                    mr: marginLeft === 0 ? 1 : undefined,
                    color: theme.palette.divider,
                    '&:hover': {
                        color: theme.palette.third.main
                    },
                    p: 0,
                }}
            >
                <HelpIcon fontSize={sizeIcon} />
            </IconButton>
        </Tooltip>
    )
}

export default HelpIconWithTooltip;