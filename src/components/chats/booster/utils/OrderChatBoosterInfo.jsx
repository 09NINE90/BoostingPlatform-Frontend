import theme from "src/theme/theme.jsx";
import {Box, Typography} from "@mui/material";
import React from "react";
import AccordionOrderOptions from "src/layouts/utils/ui/AccordionOrderOptions.jsx";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import CustomTextItem from "src/components/chats/utils/CustomTextItem.jsx";
import TipOrderHistory from "src/components/chats/allUserUtils/TipOrderHistory.jsx";
import {toLocaleDateTime} from "src/utils/functions.js";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const OrderChatBoosterInfo = ({
                                  order,
                                  openModal,
                                  openStartSessionModal,
                                  openFinishSessionModal,
                                  tipOrderHistory,
                                  isLoading,
                                  isSessionLoading
                              }) => {
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
                    width: {xs: '100%', sm: '29%'},
                    minWidth: '29%',
                    height: "85vh",
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.paper,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <CustomLoader size={0.7} height='100%'/>
            </Box>
        )
    }

    if (order) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
                    width: {xs: '100%', sm: '29%'},
                    minWidth: '29%',
                    height: {xs: 'fit-content', sm: "85vh"},
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.paper,
                }}>
                <Box sx={{flexGrow: 1, overflowY: 'auto', pr: 1}}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}>
                        Order information
                    </Typography>
                    <CustomTextItem text='Order' item={order.secondId}/>
                    <CustomTextItem text='Status' item={order.orderStatus}/>
                    <CustomTextItem text='Game' item={order.gameName}/>
                    <CustomTextItem text='Platform' item={order.gamePlatform.name}/>
                    <CustomTextItem text='Start order at' item={toLocaleDateTime(order.startTimeExecution)}/>
                    <CustomTextItem text='Salary' item={`$ ${order.boosterSalary}`}/>
                    <AccordionOrderOptions selectedOptions={order.selectedOptions}/>
                    {tipOrderHistory && (
                        <TipOrderHistory tipOrderHistory={tipOrderHistory}/>
                    )}
                </Box>
                {order.orderStatus === IN_PROGRESS && (
                    <Box>
                        {order.hasActiveSession ? (
                                <OutlinedBlueButton
                                    loading={isSessionLoading}
                                    onClick={() => openFinishSessionModal()}
                                    sx={{mt: 2, p: 2, width: '100%',}}
                                >
                                    Finish session
                                </OutlinedBlueButton>
                            )
                            : (
                                <OutlinedBlueButton
                                    loading={isSessionLoading}
                                    onClick={() => openStartSessionModal()}
                                    sx={{mt: 2, p: 2, width: '100%',}}
                                >
                                    Start session
                                </OutlinedBlueButton>
                            )
                        }
                        <ContainedBlueButton
                            onClick={() => openModal()}
                            sx={{mt: 2, p: 2, width: '100%',}}
                        >
                            Finish order
                        </ContainedBlueButton>
                    </Box>
                )}
            </Box>
        )
    }

}

export default OrderChatBoosterInfo;