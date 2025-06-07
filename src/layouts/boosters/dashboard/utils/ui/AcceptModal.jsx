import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Button} from "@mui/material";

const AcceptModal = ({ isOpen, onClose, onAccept }) => (
    <ModalTemplate
        isOpen={isOpen}
        onClose={onClose}
        content={<p>Are you sure?</p>}
        actions={
            <div className='flex justify-center items-center'>
                <Button variant="outlined" onClick={onAccept}>
                    Accept
                </Button>
            </div>
        }
    />
);

export default AcceptModal;
