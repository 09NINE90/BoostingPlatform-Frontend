import TableCell from "@mui/material/TableCell";
import {Box} from "@mui/material";
import PlatformIconContainer from "src/layouts/utils/ui/PlatformIconContainer.jsx";
import React from "react";

const CustomTableCell = ({width, item, center = true, iconName = null}) => {
    return (
        <TableCell
            align={center ? 'center' : 'left'}
            sx={{
                width: width,
                verticalAlign: 'middle'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: center ? 'center' : 'flex-start',
                    gap: 1
                }}
            >
                {iconName && (
                    <PlatformIconContainer platformId={iconName} />
                )}
                <div className='text-text-primary kanit-light'>{item}</div>
            </Box>
        </TableCell>
    )
}

export default CustomTableCell;