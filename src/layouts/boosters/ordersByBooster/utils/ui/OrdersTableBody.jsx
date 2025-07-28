import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import OrderInfoCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderInfoCell.jsx";
import OrderStatusCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderStatusCell.jsx";
import theme from "src/theme/theme.jsx";
import {Link} from "react-router-dom";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const OrdersTableBody = ({allOrders}) => {

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
                    key={order.orderId}
                    sx={{
                        borderBottom: `2px solid ${theme.palette.divider}`,
                        '&:last-child': {borderBottom: 0},
                        p: 2,
                    }}
                >
                    <CustomCell center={false} width='35%' item={<OrderInfoCell orderByRow={order}/>}/>
                    <CustomCell center={false} width='15%' item={order.gameName}/>
                    <CustomCell width='15%' item={order.gamePlatform}/>
                    <CustomCell width='15%' item={`${order.boosterSalary} $`}/>
                    <CustomCell width='10%' item={<OrderStatusCell orderStatus={order.orderStatus}/>}/>
                    <CustomCell width='10%' item=
                        {order.chatId && (
                            <ContainedBlueButton
                                to={`/booster/chat/${order.chatId}/${order.orderId}`}
                                component={Link}
                                sx={{width:'70%'}}
                            >
                                OPEN CHAT
                            </ContainedBlueButton>
                        )}/>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default OrdersTableBody;