import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Box, Typography} from "@mui/material";
import UserAvatar from "src/layouts/utils/ui/UserAvatar.jsx";
import theme from "src/theme/theme.jsx";

const BoosterMiniProfileModal = ({onClose, isOpen, boosterInfo}) => {

    const InfoItem = ({param, text}) => {
        return (
            <Box padding={3} width={'100%'} bgcolor={theme.palette.background.default}>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                    }}>
                    {param}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                    }}>
                    {text}
                </Typography>
            </Box>
        )
    }

    return (
        <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            backgroundColor={theme.palette.background.paper}
            title='Booster by order'
            content={
                <Box
                    sx={{
                        gap: 3,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <UserAvatar
                        src={boosterInfo.avatarUrl}
                        size={'150px'}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: theme.typography.fontWeightBold,
                        }}>
                        {boosterInfo.boosterName}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            p: 3,
                            width: '100%',
                            whiteSpace: 'pre-line',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.default,
                            fontWeight: theme.typography.fontWeightLight,
                            maxHeight: '150px',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease',
                            '&:hover': {
                                maxHeight: 'none',
                                overflow: 'visible'
                            },
                            cursor: 'pointer'
                        }}>
                        {boosterInfo.boosterDescription}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'} gap={3} width='100%' justifyContent={'space-between'}>
                        <InfoItem param={boosterInfo.numberOfCompletedOrders} text='Orders completed'/>
                        <InfoItem param={boosterInfo.boosterLevel} text='Booster level'/>
                    </Box>
                </Box>
            }
        />

    )
}

export default BoosterMiniProfileModal;