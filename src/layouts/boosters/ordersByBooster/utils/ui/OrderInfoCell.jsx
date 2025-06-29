import {Box, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";

const OrderInfoCell = ({orderByRow}) => {

    const OrderTime = ({text, time}) => {
        return (
            <Typography variant="body2"
                        sx={{
                            mt: 2,
                            fontSize: 14,
                            display: 'flex',
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightLight,
                        }}>
                <Typography sx={{
                    mr: 2,
                    fontSize: 14,
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightLight,
                }}>
                    {text}:
                </Typography>
                {time}
            </Typography>
        )
    }

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
                <OrderTime text='Start time execution (UTC)' time={orderByRow.startTimeExecution}/>
            )}
            {orderByRow.endTimeExecution && (
                <OrderTime text='End time execution (UTC)' time={orderByRow.endTimeExecution}/>
            )}
            {orderByRow.completedAt && (
                <OrderTime text='Order status changed to completed (UTC)' time={orderByRow.completedAt}/>
            )}
        </Box>
    )
}

export default OrderInfoCell;