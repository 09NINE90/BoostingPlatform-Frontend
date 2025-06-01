import {Menu} from "@mui/material";

const DropCart = ({content, anchorEl, handleClose}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
                elevation: 4,
                sx: {
                    mt: 2,
                    minWidth: '40vw',
                    minHeight: '20vw',
                    overflow: 'visible',
                    backgroundColor: '#110134',
                    paddingBottom: '20px',
                    paddingInline: '20px',
                    paddingTop: '10px',
                    backgroundImage: 'none'
                }
            }}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            transformOrigin={{horizontal: 'center', vertical: 'top'}}
        >
            <div className="flex justify-center kanit-medium text-2xl pb-4">
                Cart
            </div>
            <div>
                {content}
            </div>
        </Menu>
    )
}

export default DropCart;