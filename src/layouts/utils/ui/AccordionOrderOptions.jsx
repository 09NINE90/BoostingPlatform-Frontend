import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import theme from "src/theme/theme.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const AccordionOrderOptions = ({selectedOptions}) => {
    if (!selectedOptions?.length) return null;

    return (
        <Accordion defaultExpanded={false} sx={{background: theme.palette.background.default, mt: 2}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{px: 2}}>
                <Typography variant="subtitle1" color="text.secondary"
                            fontWeight={theme.typography.fontWeightLight}>
                    Additional options
                </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{px: 0, py: 0}}>
                <Box
                    sx={{
                        maxHeight: '20%',
                        overflowY: 'auto',
                        pr: 1, // немного отступа под скролл
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.third.main,
                            borderRadius: '4px',
                        },

                    }}
                >
                    <List dense disablePadding>
                        {selectedOptions.map((option, idx) => (
                            <ListItem key={idx} alignItems="flex-start" sx={{px: 2}}>
                                <ListItemIcon sx={{minWidth: 'auto', pt: '6px', pr: 1}}>
                                    <FiberManualRecordIcon sx={{fontSize: 8, color: 'third.main'}}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" color="text.primary"
                                                    fontWeight={theme.typography.fontWeightLight}>
                                            {option.optionTitle}:
                                            <Typography component="span" color="text.secondary" sx={{ml: 1}}
                                                        fontWeight={theme.typography.fontWeightLight}>
                                                {option.label}
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionOrderOptions;
