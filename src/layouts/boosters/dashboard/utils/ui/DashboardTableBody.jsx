import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import TableBody from "@mui/material/TableBody";

const DashboardTableBody = ({allOrders, openModal}) => {
    return (
        <TableBody>
            {allOrders.map((order) => (
                <TableRow
                    key={order.orderId}
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        p: 2
                    }}
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