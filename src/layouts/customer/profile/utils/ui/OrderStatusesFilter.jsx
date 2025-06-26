import {Box, Chip} from "@mui/material";
import React from "react";
import theme from "src/theme/theme.jsx";

const OrderStatusesFilter = ({statuses, selectedStatus, setSelectedStatus}) => {
    return (
        <Box sx={{display: 'flex', overflowX: 'auto', marginBottom: 3}}>
            {statuses.length > 0 && (
                <Chip
                    label="Clear filters"
                    clickable
                    onClick={() => setSelectedStatus({status: null})}
                    sx={{
                        marginRight: 1,
                        backgroundColor: '#19054D',
                        fontWeight: theme.typography.fontWeightLight,
                        ":hover": {backgroundColor: '#e68900', color: '#0A0022'}
                    }}
                />
            )}
            {statuses.map((status) => (
                <Chip
                    key={status.id}
                    label={status.value}
                    clickable
                    onClick={() => setSelectedStatus({status: status.name})}
                    sx={{
                        marginRight: 1,
                        fontWeight: theme.typography.fontWeightLight,
                        backgroundColor: '#19054D',
                        color: 'white',
                        ...(selectedStatus.status === status.name && {
                            backgroundColor: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightMedium,
                            color: '#0A0022',
                        })
                    }}
                />
            ))}
        </Box>
    )
}

export default OrderStatusesFilter;