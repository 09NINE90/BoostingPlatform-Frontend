import {Menu, MenuItem} from "@mui/material";

const DropMenu = ({anchorEl, handleClose, isAuthenticated, handleOpenProfile, handleLogout, onOpen}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
                elevation: 4,
                sx: {
                    mt: 2,
                    minWidth: 180,
                    overflow: 'visible'
                }
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            {isAuthenticated && (
                <>
                    <MenuItem onClick={handleOpenProfile} sx={{py: 1.5}}>
                        <span className="kanit-light">My Profile</span>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{py: 1.5}}>
                        <span className="kanit-light">Logout</span>
                    </MenuItem>
                </>
            )}
            {!isAuthenticated && (
                <MenuItem onClick={onOpen} sx={{py: 1.5}}>
                    <span className="kanit-light">Sign in / Sign up</span>
                </MenuItem>
            )}
        </Menu>
    )
}

export default DropMenu;