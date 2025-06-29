import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import OrderInfoCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderInfoCell.jsx";
import OrderStatusCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderStatusCell.jsx";

const OrdersTableBody = ({allOrders, openModal}) => {
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
                        <Button onClick={() => openModal(order)}>
                            GET INFO
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default OrdersTableBody;