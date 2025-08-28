import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography
} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTextItem from "src/components/chats/utils/CustomTextItem.jsx";

const BoosterInfo = ({ boosterInfo }) => {
    return(
        <Accordion defaultExpanded={false} sx={{background: theme.palette.background.default,}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{px: 2}}>
                <Typography variant="subtitle1" color="text.secondary"
                            fontWeight={theme.typography.fontWeightLight}>
                    Booster info
                </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{px: 0, py: 0}}>
                <Box
                    sx={{
                        maxHeight: '20%',
                        p: 2,
                    }}
                >
                    <CustomTextItem text='Nickname' item={boosterInfo.boosterName} fontSize={14}/>
                    <CustomTextItem text='Level' item={boosterInfo.boosterLevel} fontSize={14}/>
                    <CustomTextItem text='Completed orders' item={boosterInfo.numberOfCompletedOrders} fontSize={14}/>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default BoosterInfo;