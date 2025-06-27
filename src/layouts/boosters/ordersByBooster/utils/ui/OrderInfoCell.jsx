import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";

const OrderInfoCell = ({orderByRow}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body2"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightLight
                        }}>
                {orderByRow.offerName}
            </Typography>
            <Typography variant="body2"
                        sx={{
                            mt: 2,
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightLight
                        }}>
                ID: {orderByRow.secondId}
            </Typography>
            <OrderOptions order={orderByRow}/>
            {orderByRow.startTimeExecution && (
                <Typography variant="body2"
                            sx={{
                                mt: 2,
                                color: theme.palette.text.secondary,
                                fontWeight: theme.typography.fontWeightLight,
                                fontSize: 14
                            }}>
                    Start time execution (UTC): {orderByRow.startTimeExecution}
                </Typography>
            )}
            {orderByRow.endTimeExecution && (
                <Typography variant="body2"
                            sx={{
                                mt: 2,
                                color: theme.palette.text.secondary,
                                fontWeight: theme.typography.fontWeightLight,
                                fontSize: 14
                            }}>
                    End time execution (UTC): {orderByRow.endTimeExecution}
                </Typography>
            )}
            {orderByRow.completedAt && (
                <Typography variant="body2"
                            sx={{
                                mt: 2,
                                color: theme.palette.text.secondary,
                                fontWeight: theme.typography.fontWeightLight,
                                fontSize: 14
                            }}>
                    Order status changed to completed (UTC): {orderByRow.completedAt}
                </Typography>
            )}
        </Box>
    )
}

export default OrderInfoCell;