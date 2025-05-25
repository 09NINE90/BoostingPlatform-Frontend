import React, {useEffect} from 'react';
import { Box, Breadcrumbs, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import InfoBlockList from '../../components/offer/info/InfoBlockList';
import InfoBlockAccordionList from '../../components/offer/info/InfoBlockAccordionList';
import InfoBlockAccordion from '../../components/offer/info/InfoBlockAccordion';
import InfoBlockRelatedOffers from '../../components/offer/info/InfoBlockRelatedOffers';


const OfferInfo = ( {offerData} ) => {

  const renderBlock = (blockInfo) => (
    <Box>
      { blockInfo.type === "BLOCK" &&
        <Box>
          <Typography variant="h4" className="text-white font-bold !mb-4">
            {blockInfo.title}
          </Typography>
          <Typography variant="body1" className="text-gray-300">
            {blockInfo.description}
          </Typography>
            {blockInfo.items.map(renderBlock)}
        </Box>
      }

      { blockInfo.type === "LIST" &&
        <InfoBlockList data={blockInfo}/>
      }

      { blockInfo.type === "ACCORDION_LIST" &&
        <InfoBlockAccordionList data={blockInfo}/>
      }

      { blockInfo.type === "ACCORDION" &&
        <Box> 
          <InfoBlockAccordion data={blockInfo}/>
        </Box>
      }
      
      { blockInfo.type === "RELATED_OFFERS" &&
          <InfoBlockRelatedOffers />
      }
    </Box>
  )

  return (
    <Box className="p-6 space-y-6  m-2 mt-7">
    
      <Breadcrumbs separator="›" aria-label="breadcrumb" className="text-gray-400">
        <Link color="secondary" component={NavLink} to={`/${offerData.gameId}`} className="hover:underline">
          Home
        </Link>
        <Link color="secondary" component={NavLink} to={`/games/${offerData.gameId}`} className="hover:underline">
          {offerData.gameName}
        </Link>
        <Typography color="text.primary">{offerData.title}</Typography>
      </Breadcrumbs>

      <Typography variant="h3" className="text-white font-bold !mb-5">
        {offerData.title}
      </Typography>

      <Typography variant="body1" className="text-gray-300">
        {offerData.description}
      </Typography>

      {offerData.sections.map(renderBlock)}
    </Box>
  );
};

export default OfferInfo;
