import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Button} from "@mui/material";
import React from "react";
import {IN_PROGRESS} from "src/layouts/boosters/ordersByBooster/utils/StatusesData.js";

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
                                    <Button variant="outlined" onClick={onComplete}>
                                        Complete
                                    </Button>
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
            />
        );
    }
}

export default OrderInfoModal;