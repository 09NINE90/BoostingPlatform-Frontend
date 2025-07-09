import {Box, Typography, IconButton, styled} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import theme from "src/theme/theme.jsx";

const StyledModalOverlay = styled(Box)(({theme}) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.modal,
    backdropFilter: 'blur(5px)',
}));

const StyledModal = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    width: 400,
    minWidth: 400,
    maxWidth: '85vw',
    height: 'auto',
    maxHeight: '80vh',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden',
}));

const StyledModalContent = styled(Box)({
    padding: '20px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    color: '#fff',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: 0,
    },
});

const StyledCloseButton = styled(IconButton)({
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    minWidth: '30px',
    borderRadius: 0,
    background: '#2a206a',
    color: '#fff',
    '&:hover': {
        transform: 'scale(1.1)',
        background: 'linear-gradient(135deg, #ff4c4c, #d93636)',
        boxShadow: '0 6px 15px rgba(255, 76, 76, 0.6)',
    },
    '&:active': {
        transform: 'scale(0.95)',
        background: 'linear-gradient(135deg, #d93636, #a82828)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    },
});

const ModalTemplate = ({
                           isOpen,
                           title,
                           content,
                           actions,
                           onClose,
                           viewCloseIcon = true,
                           modalClassName,
                           modalContentClassName,
                           additionalStyles,
                           width = 400,
                           minWidth = 400,
                           maxWidth = '85vw',
                           minHeight = '50%',
                           maxHeight = '80vh',
                           backgroundColor = '#110134',
                       }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <StyledModalOverlay onClick={handleOverlayClick}>
            <StyledModal
                sx={{
                    width,
                    minWidth,
                    maxWidth,
                    minHeight,
                    maxHeight,
                    backgroundColor,
                    ...additionalStyles,
                }}
                className={modalClassName}
            >
                <StyledModalContent className={modalContentClassName}>
                    {viewCloseIcon && (
                        <StyledCloseButton onClick={onClose}>
                            <CloseIcon/>
                        </StyledCloseButton>
                    )}


                    {title && (
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: theme.typography.fontWeightBold,
                                color: theme.palette.text.primary,
                                mb: 3,
                            }}>
                            {title}
                        </Typography>
                    )}

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {content}
                    </Box>

                    <Box sx={{
                        mt: 'auto',
                        pt: 2,
                    }}>
                        {actions}
                    </Box>
                </StyledModalContent>
            </StyledModal>
        </StyledModalOverlay>
    );
};

ModalTemplate.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.node,
    content: PropTypes.node,
    actions: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    modalClassName: PropTypes.string,
    modalContentClassName: PropTypes.string,
    additionalStyles: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    backgroundColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    viewCloseIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ModalTemplate;