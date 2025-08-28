import {Box, Chip, Divider, Typography} from '@mui/material';
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OrderStatusCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderStatusCell.jsx";
import OrderInfoCell from "src/layouts/boosters/ordersByBooster/utils/ui/OrderInfoCell.jsx";
import OrdersMobileFilters from "src/layouts/boosters/ordersByBooster/utils/ui/OrdersMobileFilters.jsx";
import {Link} from "react-router-dom";
import theme from "src/theme/theme.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const OrdersMobileView = ({orders, loading, selectedFilters, setSelectedFilters}) => {

    return (
        <Box sx={{p: 2, width: '100%', pb: 15, paddingInline: {xs: 2, sm: 15}}}>
            <OrdersMobileFilters
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />

            {orders.length === 0 && !loading && (
                <EmptyResponse text={'no orders by filter'}/>
            )}

            {loading && (
                <Box sx={{pt: '10%'}}>
                    <CustomLoader height='100%'/>
                </Box>
            )}
            {/* Карточки заказов */}
            {orders.map((order) => (
                <Box
                    key={order.orderId}
                    sx={{
                        p: 2,
                        mb: 3,
                        boxShadow: 2,
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                        <Typography variant="h6" sx={{fontWeight: theme.typography.fontWeightBold}}>
                            {order.gameName}
                        </Typography>
                        <Chip
                            label={`${order.boosterSalary}$`}
                            sx={{
                                fontWeight: theme.typography.fontWeightRegular,
                                color: theme.palette.statuses.completed,
                                fontSize: {xs: 14, md: 16}
                            }}
                            size="medium"
                        />
                    </Box>

                    <OrderStatusCell orderStatus={order.orderStatus}/>

                    <Divider sx={{my: 2}}/>

                    <OrderInfoCell orderByRow={order} mobileView/>
                    {order.chatId && (
                        <Box sx={{mt: 'auto', display: 'flex', justifyContent: 'flex-end'}}>
                            <ContainedBlueButton
                                to={`/booster/chat/${order.chatId}/${order.orderId}`}
                                component={Link}
                                sx={{width: '150px'}}
                            >
                                OPEN CHAT
                            </ContainedBlueButton>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default OrdersMobileView;