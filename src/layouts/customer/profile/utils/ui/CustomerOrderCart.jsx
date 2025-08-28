import theme from "src/theme/theme.jsx";
import {Box, Tooltip, Typography} from "@mui/material";
import React from "react";
import {useIsTextOverflowed} from "src/utils/functions.js";
import {Link} from "react-router-dom";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";

const CustomerOrderCart = ({order, onOpen}) => {

    const [textRef, isOverflowed] = useIsTextOverflowed();

    return (
        <Box
            key={order.orderId}
            sx={{
                p: 4,
                mb: 4,
                position: "relative",
                backgroundColor: theme.palette.background.default,
            }}>
            <div className="flex justify-between items-start mb-3">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "90%",
                    }}>
                    <Box display="flex">
                        <span className="text-third mr-2">OFFER</span>
                        <Tooltip
                            title={order.offerName}
                            disableHoverListener={!isOverflowed}
                        >
                            <Typography
                                ref={textRef}
                                sx={{
                                    width: '80%',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {order.offerName}
                            </Typography>
                        </Tooltip>
                    </Box>

                    <span className="text-third">ID: {order.secondId}</span>
                    <h3 className="text-lg kanit-regular text-text-primary">
                                        <span
                                            className="text-third">Platform:</span> {order.gamePlatform.name}
                    </h3>
                </Box>

                <Box
                    sx={{
                        gap: 3,
                        width: '150px',
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                    <Box sx={{width: '100%'}}>
                        <span
                            className={`block px-3 py-1 text-xs kanit-light text-center ${
                                order.orderStatus === 'CREATED' ? 'bg-[#0A0022] text-text-primary border border-text-primary' :
                                    order.orderStatus === 'IN_PROGRESS' ? 'bg-[#0A0022] text-primary border border-primary' :
                                        order.orderStatus === 'ON_PENDING' ? 'bg-[#0A0022] text-third border border-third' :
                                            'bg-[#0A0022] text-completed border border-completed'
                            }`}
                            style={{width: '100%', display: 'block'}}
                        >
                            {order.orderStatus.replace('_', ' ')}
                        </span>
                    </Box>
                    {order.boosterId && (
                        <ContainedBlueButton
                            onClick={() => {
                                onOpen(order.boosterId)
                            }}
                            sx={{mt: 2, height: 40, width: '100%',}}
                        >
                            View booster
                        </ContainedBlueButton>
                    )}
                    {order.chatId && (
                        <OutlinedBlueButton
                            to={`/chat/${order.chatId}/${order.orderId}`}
                            component={Link}
                            sx={{mt: 2, height: 40, width: '100%',}}
                        >
                            OPEN CHAT
                        </OutlinedBlueButton>
                    )}

                </Box>
            </div>

            <div className="mb-4">
                <p className="text-sm text-text-primary opacity-80 mb-1">Game</p>
                <p className="text-text-primary font-medium">{order.gameName}</p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-background-paper">
                <span className="text-xl font-bold text-third">$ {order.totalPrice}</span>
            </div>
        </Box>
    )
}

export default CustomerOrderCart;