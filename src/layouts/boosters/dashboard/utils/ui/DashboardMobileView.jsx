import React, {useMemo} from "react";
import theme from "src/theme/theme.jsx";
import {Box, Chip, Skeleton, Typography, useMediaQuery} from "@mui/material";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import AccordionOrderOptions from "src/layouts/utils/ui/AccordionOrderOptions.jsx";
import DashboardMobileFilters from "src/layouts/boosters/dashboard/utils/ui/DashboardMobileFilters.jsx";
import OrderOptions from "src/layouts/utils/ui/OrderOptions.jsx";
import PlatformIconContainer from "src/layouts/utils/ui/PlatformIconContainer.jsx";
import SkeletonDashboardCart from "./SkeletonDashboardCart.jsx";

const DashboardMobileView = ({
                                 setSelectedFilters,
                                 selectedFilters,
                                 setPageNumber,
                                 allOrders,
                                 openModal,
                                 loading
                             }) => {
    const isMobile = useMediaQuery('(max-width:700px)');

    const skeletonOrders = useMemo(() => {
        if (!loading) return null;

        return [...Array(4)].map((_, index) => (
            <SkeletonDashboardCart index={index} key={index}/>
        ));
    }, [loading, allOrders]);

    return (
        <Box sx={{p: 2, width: '100%', pb: 25, paddingInline: {xs: 2, sm: 15}}}>
            <DashboardMobileFilters
                setPageNumber={setPageNumber}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />

            {allOrders.length === 0 && !loading && (
                <EmptyResponse text="no orders by filter"/>
            )}

            {skeletonOrders}
            {!loading && allOrders.map((order) => (
                    <Box
                        key={order.orderId}
                        sx={{
                            mb: 3,
                            p: 2,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: 2,
                            transition: '0.2s',
                            '&:hover': {
                                boxShadow: 4,
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                            <Typography variant="h6" sx={{fontWeight: theme.typography.fontWeightBold}}>
                                {order.offerName}
                            </Typography>
                            <Chip
                                label={`${order.totalPrice}$`}
                                sx={{
                                    fontWeight: theme.typography.fontWeightRegular,
                                    color: theme.palette.primary.main,
                                    fontSize: {xs: 14, md: 16}
                                }}
                                size="medium"
                            />
                        </Box>

                        <Typography variant="body2" sx={{mb: 1, color: theme.palette.primary.main}}>
                            ID: {order.secondId}
                        </Typography>
                        <Typography variant="body2" sx={{mb: 0.5, color: theme.palette.text.secondary}}>
                            Game: {order.gameName}
                        </Typography>

                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="body2" sx={{mb: 0.5, color: theme.palette.text.secondary}}>
                                Platform: {order.gamePlatform.name}
                            </Typography>
                            <PlatformIconContainer platformId={order.gamePlatform.title}/>
                        </Box>

                        {order.selectedOptions.length > 0 ? (
                                <>
                                    {isMobile ? (
                                            <AccordionOrderOptions selectedOptions={order.selectedOptions}/>
                                        )
                                        : (
                                            <OrderOptions order={order}/>
                                        )
                                    }
                                </>
                            )
                            : (
                                <Typography variant="body2" sx={{mb: 0.5, color: theme.palette.text.secondary}}>
                                    Without additional options
                                </Typography>
                            )}

                        <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                            <ContainedBlueButton
                                onClick={(e) => {
                                    e.stopPropagation()
                                    openModal(order)
                                }}
                                sx={{width: '150px'}}
                            >
                                Accept
                            </ContainedBlueButton>
                        </Box>
                    </Box>
                )
            )}
        </Box>
    )
}

export default DashboardMobileView;