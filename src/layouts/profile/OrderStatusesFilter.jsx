import {Box, Chip} from "@mui/material";
import React from "react";

const OrderStatusesFilter = ({statuses, selectedStatus, setSelectedStatus}) => {
    return (
        <Box sx={{display: 'flex', overflowX: 'auto', marginBottom: 3}}>
            {statuses.length > 0 && (
                <Chip
                    label="Clear filters"
                    clickable
                    onClick={() => setSelectedStatus({status: null})}
                    sx={{marginRight: 1, backgroundColor: '#19054D', ":hover": {backgroundColor: '#e68900'}}}
                />
            )}
            {statuses.map((status) => (
                <Chip
                    key={status.id}
                    label={status.name}
                    clickable
                    onClick={() => setSelectedStatus({status: status.name})}
                    sx={{
                        marginRight: 1,
                        backgroundColor: '#19054D',
                        color: 'white',
                        ...(selectedStatus.status === status.name && {
                            backgroundColor: '#FD980B',
                            color: '#0A0022',
                            fontWeight: 'bold'
                        })
                    }}
                />
            ))}
        </Box>
    )
}

export default OrderStatusesFilter;