import theme from "src/theme/theme.jsx";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {toLocaleDateTime} from "src/utils/functions.js";

const TipOrderHistory = ({tipOrderHistory}) => {

    const TipItem = ({tip}) => {

        const {status, amount, createdAt} = tip;

        const getStatusColor = (status) => {
            switch (status) {
                case 'ON_PENDING':
                    return theme.palette.third.main;
                case 'COMPLETED':
                    return theme.palette.statuses.completed;
            }
        };

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                    px: 1,
                    py: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 1,
                }}
            >
                <Box>
                    <Typography variant='body2'
                                color="text.primary" fontWeight={theme.typography.fontWeightLight}>
                        ${amount}
                    </Typography>
                    <Typography variant='body2'
                                color="text.secondary" fontWeight={theme.typography.fontWeightLight}>
                        {toLocaleDateTime(createdAt)}
                    </Typography>
                </Box>

                <Typography
                    variant='body2'
                    fontWeight={theme.typography.fontWeightLight}
                    sx={{color: getStatusColor(status), textTransform: 'capitalize'}}
                >
                    {status.toLowerCase().replace(/_/g, ' ')}
                </Typography>
            </Box>
        )
    }

    return (
        <Accordion defaultExpanded={false} sx={{background: theme.palette.background.default,}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{px: 2}}>
                <Typography variant="subtitle1" color="text.secondary"
                            fontWeight={theme.typography.fontWeightLight}>
                    Tip history
                </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{px: 0, py: 0}}>
                <Box
                    sx={{
                        maxHeight: '20%',
                        p: 2,
                    }}
                >
                    {tipOrderHistory.map((item) => (
                        <TipItem tip={item} key={item.id}/>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default TipOrderHistory;