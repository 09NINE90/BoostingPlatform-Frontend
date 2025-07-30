import {Box, Drawer, IconButton, Menu, useMediaQuery} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "src/theme/theme.jsx";

const DropCart = ({content, anchorEl, handleClose}) => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    if (isMobile) {
        return (
            <Drawer
                anchor="bottom"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    zIndex: 9999,
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.background.paper,
                        padding: '16px',
                        minHeight: '40vh',
                        maxHeight: '90vh',
                        backgroundImage: 'none',
                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Box sx={{
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        width: '100%',
                        color: 'white'
                    }}>
                        Cart
                    </Box>
                    <IconButton
                        onClick={handleClose}
                        sx={{ color: 'white', position: 'absolute', right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{
                    overflowY: 'auto',
                    flex: 1,
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.third.main,
                        borderRadius: '3px',
                    }
                }}>
                    {content}
                </Box>
            </Drawer>
        );
    }

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
                elevation: 4,
                sx: {
                    mt: 2,
                    minWidth: '50vw',
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
            <Box sx={{
                fontWeight: theme.typography.fontWeightBold,
                fontSize: '1.5rem',
                textAlign: 'center',
                pb: 3,
                color: 'white'
            }}>
                Cart
            </Box>
            <Box>
                {content}
            </Box>
        </Menu>
    )
}

export default DropCart;