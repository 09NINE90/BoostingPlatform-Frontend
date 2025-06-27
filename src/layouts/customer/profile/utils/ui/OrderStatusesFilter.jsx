import {Box, Button, Chip} from "@mui/material";
import React from "react";
import theme from "src/theme/theme.jsx";

const OrderStatusesFilter = ({statuses, selectedStatus, setSelectedStatus}) => {
    return (
        <Box sx={{display: 'flex', overflowX: 'auto', mb: 5}}>
            {statuses.length > 0 && (
                <Button
                    onClick={() => setSelectedStatus({status: null})}
                    sx={{
                        mr: 2,
                        border: 0,
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        '&:hover': {
                            ...(selectedStatus.status !== null && {
                                backgroundColor: theme.palette.third.hover,
                            })
                        },
                        ...(selectedStatus.status === null && {
                            backgroundColor: theme.palette.background.default,
                            borderColor: theme.palette.third.main,
                            border: 1,
                        })
                    }}
                >
                    Clear filters
                </Button>
            )}
            {statuses.map((status) => (
                <Button
                    key={status.id}
                    onClick={() => setSelectedStatus({status: status.name})}
                    sx={{
                        mr: 2,
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        fontWeight: theme.typography.fontWeightLight,
                        border: 1,
                        borderColor: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: theme.palette.background.paper,
                            borderColor: theme.palette.third.main,
                        },
                        ...(selectedStatus.status === status.name && {
                            backgroundColor: theme.palette.background.paper,
                            borderColor: theme.palette.third.main,
                        })
                    }}
                >
                    {status.value}
                </Button>
            ))}
        </Box>
    )
}

export default OrderStatusesFilter;