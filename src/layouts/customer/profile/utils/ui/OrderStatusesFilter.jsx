import {Box, Button} from "@mui/material";
import React from "react";
import theme from "src/theme/theme.jsx";

const OrderStatusesFilter = ({statuses, selectedStatus, setSelectedStatus}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: {xs: 'wrap', sm: 'nowrap'},
            overflowX: {sm: 'auto'},
            gap: 2,
            py: {xs: 1, sm: 0},
            mb: 5
        }}>
            {statuses.length > 0 && (
                <Button
                    disabled={selectedStatus.status === null}
                    onClick={() => setSelectedStatus({status: null})}
                    sx={{
                        border: 0,
                        flexShrink: 0,
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        px: { xs: 1.5, sm: 2 },
                        minWidth: 'auto',
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
                    disabled={selectedStatus.status === status.name}
                    onClick={() => setSelectedStatus({status: status.name})}
                    sx={{
                        flexShrink: 0,
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        fontWeight: theme.typography.fontWeightLight,
                        border: 1,
                        borderColor: theme.palette.text.primary,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        px: { xs: 1.5, sm: 2 },
                        minWidth: 'auto',
                        whiteSpace: 'nowrap',
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