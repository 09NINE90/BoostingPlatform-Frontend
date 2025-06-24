import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import {ordersStatusesMap} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";

const OrdersTableBody = ({allOrders}) => {
    return (
        <TableBody>
            {allOrders.map((order) => (
                <TableRow
                    key={order.orderId}
                    sx={{'&:last-child td, &:last-child th': {border: 0}, p: 2}}
                >
                    <TableCell component="th" scope="row" sx={{width: '35%'}}>
                        <div className='text-text-primary kanit-light'>
                            {order.offerName} # {order.secondId}
                            <OrderOptions order={order}/>
                        </div>
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
                        <div
                            className='text-text-primary kanit-light'>{ordersStatusesMap.get(order.orderStatus)}</div>
                    </TableCell>
                    <TableCell align="center" sx={{width: '10%'}}>
                        <Button>
                            GET INFO
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default OrdersTableBody;