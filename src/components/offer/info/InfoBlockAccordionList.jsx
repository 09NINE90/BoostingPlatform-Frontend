import React, {useId} from 'react'
import {Box, Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InfoBlockAccordionList = ({data}) => {

  const blockId = useId();
  return (
    <Box sx={{py: 1}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
        >
          <Typography variant="h5" className="text-white font-bold">
            {data.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{listStyleType: 'disc', pl: 4}}>
            {data.items.map((item, index) => (
              <ListItem key={`${blockId}_${index}`} sx={{display: 'list-item', p: "4px"}}>
                <ListItemText>
                  <Typography variant="body1" className="text-gray-300">
                    {item.description}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default InfoBlockAccordionList