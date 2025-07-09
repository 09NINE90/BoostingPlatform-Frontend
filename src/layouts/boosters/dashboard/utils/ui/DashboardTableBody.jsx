import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box, Button, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import theme from "src/theme/theme.jsx";

const DashboardTableBody = ({allOrders, openModal}) => {

    const CustomCell = ({width, item, center = true}) => {
        return (
            <TableCell
                align={center ? 'center' : 'left'}
                sx={{width: width}}
            >
                <div className='text-text-primary kanit-light'>{item}</div>
            </TableCell>
        )
    }

    return (
        <TableBody>
            {allOrders.map((order) => (
                <TableRow
                    onClick={() => openModal(order)}
                    key={order.orderId}
                    sx={{
                        borderBottom: `2px solid ${theme.palette.divider}`,
                        '&:last-child': {borderBottom: 0},
                        p: 2,
                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: theme.palette.background.paper,
                        }
                    }}
                >
                    <TableCell sx={{width: '35%'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="body2"
                                        sx={{
                                            color: theme.palette.text.primary,
                                            fontWeight: theme.typography.fontWeightLight
                                        }}>
                                {order.offerName}
                            </Typography>
                            <Typography variant="body2"
                                        sx={{
                                            mt: 2,
                                            color: theme.palette.primary.main,
                                            fontWeight: theme.typography.fontWeightLight
                                        }}>
                                ID: {order.secondId}
                            </Typography>
                            <OrderOptions order={order}/>
                        </Box>
                    </TableCell>
                    <CustomCell center={false} width='15%' item={order.gameName}/>
                    <CustomCell width='15%' item={order.gamePlatform}/>
                    <CustomCell width='15%' item={`${order.totalPrice} $`}/>
                    <CustomCell width='20%' item={
                        <Button
                            onClick={() => openModal(order)}
                            sx={{
                                width: '40%',
                                height: '30px',
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.third.main,
                                fontWeight: theme.typography.fontWeightLight,
                                '&:hover': {
                                    backgroundColor: theme.palette.third.hover,
                                }
                            }}>
                            Accept
                        </Button>
                    }/>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default DashboardTableBody;