import {List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import theme from "src/theme/theme.jsx";

const OrderOptions = ({order}) => {
    return (
        <>
            {order.selectedOptions && order.selectedOptions.length > 0 && (
                <List dense disablePadding>
                    {order.selectedOptions.map((option, idx) => (
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
            )}
        </>
    )
}

export default OrderOptions;