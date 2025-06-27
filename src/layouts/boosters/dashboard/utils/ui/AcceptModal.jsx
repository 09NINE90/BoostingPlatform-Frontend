import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Button} from "@mui/material";
import React from "react";
import OrderOptions from "src/layouts/boosters/dashboard/utils/ui/OrderOptions.jsx";

const AcceptModal = ({isOpen, onClose, onAccept, selectedOrder}) => {

    if (selectedOrder) {
        return (
            <ModalTemplate
                isOpen={isOpen}
                onClose={onClose}
                title='Accept order'
                content={
                    <>
                        <div className="flex flex-col text-xl">
                            <p className='flex text-left kanit-light mt-2'>
                                <span className='kanit-regular mr-2'>Order:</span>
                                {selectedOrder.offerName} #{selectedOrder.secondId}
                            </p>
                            <p className='flex text-left kanit-light mt-2'>
                                <span className='kanit-regular mr-2'>Game:</span>
                                {selectedOrder.gameName}
                            </p>
                            <p className='flex text-left kanit-light mt-2'>
                                <span className='kanit-regular mr-2'>Platform:</span>
                                {selectedOrder.gamePlatform}
                            </p>
                            <OrderOptions order={selectedOrder}/>
                            <p className='flex text-left kanit-light mt-2'>
                                <span className='kanit-regular mr-2'>Price:</span>
                                $ {selectedOrder.totalPrice}
                            </p>
                            <div className='flex justify-center items-center'>
                                <Button variant="outlined" onClick={onAccept}>
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </>
                }
            />
        )
    }

};

export default AcceptModal;
