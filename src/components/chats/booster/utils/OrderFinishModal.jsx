import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Button} from "@mui/material";
import React from "react";
import theme from "src/theme/theme.jsx";

const OrderFinishModal = ({isOpen, onClose, onComplete}) => {
    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Complete the order'
            actions={
                <Button
                    onClick={onComplete}
                    sx={{
                        mt: 5,
                        width: '100%',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        '&:hover': {
                            backgroundColor: theme.palette.third.hover,
                        }
                    }}>
                    Complete
                </Button>
            }
        />
    );
}

export default OrderFinishModal;