import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Button} from "@mui/material";
import React from "react";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";
import theme from "src/theme/theme.jsx";

const OrderInfoModal = ({isOpen, onClose, onComplete, selectedOrder}) => {
    if (selectedOrder) {
        return (
            <ModalTemplate
                isOpen={isOpen}
                onClose={onClose}
                title='Complete the order'
                content={
                    selectedOrder.orderStatus === IN_PROGRESS ? (
                            <div className="flex flex-col text-xl">
                                <div className='flex justify-center items-center'>

                                </div>
                            </div>
                        )
                        : (
                            <div className="flex flex-col text-xl">
                                <div className='flex justify-center items-center'>
                                    Order already completed
                                </div>
                            </div>
                        )
                }
                actions={
                    <Button
                        onClick={onComplete}
                        sx={{
                            mt: 5,
                            width: '100%',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightLight,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                            }
                        }}>
                        Complete
                    </Button>
                }
            />
        );
    }
}

export default OrderInfoModal;