import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import OrderInfoCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderInfoCell.jsx";
import OrderStatusCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderStatusCell.jsx";
import theme from "src/theme/theme.jsx";
import {Link} from "react-router-dom";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import CustomTableCell from "src/layouts/utils/ui/CustomTableCell.jsx";

const OrdersTableBody = ({allOrders}) => {

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
                    <CustomTableCell center={false} width='35%' item={<OrderInfoCell orderByRow={order}/>}/>
                    <CustomTableCell center={false} width='15%' item={order.gameName}/>
                    <CustomTableCell width='15%' item={order.gamePlatform.name} iconName={order.gamePlatform.title}/>
                    <CustomTableCell width='15%' item={`${order.boosterSalary} $`}/>
                    <CustomTableCell width='10%' item={<OrderStatusCell orderStatus={order.orderStatus}/>}/>
                    <CustomTableCell width='10%' item=
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