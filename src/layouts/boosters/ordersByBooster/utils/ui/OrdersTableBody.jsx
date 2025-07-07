import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import OrderInfoCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderInfoCell.jsx";
import OrderStatusCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderStatusCell.jsx";
import theme from "src/theme/theme.jsx";
import {Link} from "react-router-dom";

const OrdersTableBody = ({allOrders}) => {

    return (
        <TableBody>
            {allOrders.map((order) => (
                <TableRow
                    key={order.orderId}
                    sx={{'&:last-child td, &:last-child th': {border: 0}, p: 2}}
                >
                    <TableCell component="th" scope="row" sx={{width: '35%'}}>
                        <OrderInfoCell orderByRow={order}/>
                    </TableCell>
                    <TableCell sx={{width: '15%'}}>
                        <div className='text-text-primary kanit-light'>{order.gameName}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '15%'}}>
                        <div className='text-text-primary kanit-light'>{order.gamePlatform}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '15%'}}>
                        <div className='text-text-primary kanit-light'>${order.boosterSalary}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '10%'}}>
                        <OrderStatusCell orderStatus={order.orderStatus}/>
                    </TableCell>
                    <TableCell align="center" sx={{width: '10%'}}>
                        {order.chatId && (
                            <Button
                                to={`/booster/chat/${order.chatId}/${order.orderId}`}
                                component={Link}
                                sx={{
                                    mt: 2,
                                    color: theme.palette.text.primary,
                                    backgroundColor: theme.palette.background.default,
                                    fontWeight: theme.typography.fontWeightLight,
                                    border: 1,
                                    borderColor: theme.palette.text.primary,
                                    '&:hover': {
                                        backgroundColor: theme.palette.background.paper,
                                        borderColor: theme.palette.primary.main,
                                    }
                                }}
                            >
                                GET INFO
                            </Button>
                        )}

                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default OrdersTableBody;