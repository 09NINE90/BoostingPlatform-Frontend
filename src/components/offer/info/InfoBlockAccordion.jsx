import React from 'react'
import {Box, Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InfoBlockAccordion = ({data}) => {
  return (
          <Box sx={{py:1}}>
              <Accordion>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                  >
                      <Typography variant="h5" className="text-white font-bold">
                          {data.title}
                      </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" className="text-gray-300">
                        {data.data}
                    </Typography>
                  </AccordionDetails>
              </Accordion>
          </Box>
    )
}

export default InfoBlockAccordion