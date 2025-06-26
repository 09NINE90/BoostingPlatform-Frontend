import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box, Button, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import theme from "src/theme/theme.jsx";

const DashboardTableBody = ({allOrders, openModal}) => {
    return (
        <TableBody>
            {allOrders.map((order) => (
                <TableRow
                    key={order.orderId}
                    sx={{
                        '&:last-child td, &:last-child th': {border: 0},
                        p: 2
                    }}
                >
                    <TableCell component="th" scope="row" sx={{width: '35%'}}>
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
                    <TableCell sx={{width: '15%'}}>
                        <div className='text-text-primary kanit-light'>{order.gameName}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '15%'}}>
                        <div className='text-text-primary kanit-light'>{order.gamePlatform}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '15%'}}>
                        <div className='text-text-primary kanit-light'>${order.totalPrice}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '20%'}}>
                        <Button onClick={() => openModal(order)}>
                            Accept
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default DashboardTableBody;