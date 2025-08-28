import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import React from "react";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

const OrderFinishModal = ({isOpen, onClose, onComplete}) => {
    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Complete the order'
            actions={
                <ContainedBlueButton
                    onClick={onComplete}
                    sx={{mt: 5, width: '100%',}}
                >
                    Complete
                </ContainedBlueButton>
            }
        />
    );
}

export default OrderFinishModal;