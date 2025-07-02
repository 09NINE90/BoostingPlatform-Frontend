import ModalTemplate from "src/utils/modalTemplate/ModalTemplate.jsx";
import {Box, Chip, Typography} from "@mui/material";
import UserAvatar from "src/layouts/utils/ui/UserAvatar.jsx";
import theme from "src/theme/theme.jsx";

const BoosterMiniProfileModal = ({onClose, isOpen, boosterInfo}) => {

    const InfoItem = ({param, text}) => {
        return (
            <Box padding={3} width={'100%'} bgcolor={theme.palette.background.default}>
                <Typography
                    sx={{
                        fontSize: 20,
                        color: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                    }}>
                    {param}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 14,
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
            viewCloseIcon={false}
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
                        sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.fontWeightBold,
                        }}>
                        {boosterInfo.boosterName}
                    </Typography>
                    <Typography
                        sx={{
                            padding: 3,
                            fontSize: 14,
                            width: '100%',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.default,
                            fontWeight: theme.typography.fontWeightLight,
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