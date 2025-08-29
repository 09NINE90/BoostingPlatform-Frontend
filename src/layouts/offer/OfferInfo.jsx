import React, { useMemo} from 'react';
import {Box, Breadcrumbs, Typography, Link} from '@mui/material';
import {NavLink} from 'react-router-dom';
import InfoBlockList from '../../components/offer/info/InfoBlockList';
import InfoBlockAccordionList from '../../components/offer/info/InfoBlockAccordionList';
import InfoBlockAccordion from '../../components/offer/info/InfoBlockAccordion';
import InfoBlockRelatedOffers from '../../components/offer/info/InfoBlockRelatedOffers';


const OfferInfo = ({offerData}) => {

    const renderBlock = useMemo(() => {
        const renderBlockItem = (blockInfo) => (
            <Box key={blockInfo.id || blockInfo.title}>
                {blockInfo.type === "BLOCK" && (
                    <>
                        <Typography variant="h4" className="text-text-primary font-bold !mb-4">
                            {blockInfo.title}
                        </Typography>
                        <Typography variant="body1" className="text-gray-300">
                            {blockInfo.description}
                        </Typography>
                        {blockInfo.items?.map(renderBlockItem)}
                    </>
                )}

                {blockInfo.type === "LIST" && <InfoBlockList data={blockInfo} />}

                {blockInfo.type === "ACCORDION_LIST" && (
                    <InfoBlockAccordionList data={blockInfo} />
                )}

                {blockInfo.type === "ACCORDION" && (
                    <InfoBlockAccordion data={blockInfo} />
                )}

                {blockInfo.type === "RELATED_OFFERS" && <InfoBlockRelatedOffers />}
            </Box>
        );

        return offerData.sections.map(renderBlockItem);
    }, [offerData]);

    return (
        <Box className="space-y-6">
            <Breadcrumbs separator="›" aria-label="breadcrumb" className="text-gray-400">
                <Link color="primary" component={NavLink} to={`/games/${offerData.secondGameId}`}
                      className="hover:underline">
                    {offerData.gameName}
                </Link>
                <Typography color="text.primary">{offerData.title}</Typography>
            </Breadcrumbs>

            <Typography variant="h3" className="text-text-primary font-bold !mb-5">
                {offerData.title}
            </Typography>

            <Typography variant="body1" className="text-gray-300">
                {offerData.description}
            </Typography>
            {renderBlock}
        </Box>
    );
};

export default OfferInfo;
