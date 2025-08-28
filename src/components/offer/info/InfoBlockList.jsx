import React, {useId} from 'react'
import { List, ListItemText, Typography, Box, ListItem } from '@mui/material'

const InfoBlockList = ({data}) => {

    const blockId = useId();
    return (
        <Box sx={{py:2}}>
            <Typography variant="h4" className="text-white font-bold">
                {data.title}
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                {data.items.map((item, index) => (
                    <ListItem key={`${blockId}_${index}`} sx={{ display: 'list-item', p: "4px" }}>
                        <ListItemText> 
                            <Typography variant="body1" className="text-gray-300">
                                {item.title}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default InfoBlockList