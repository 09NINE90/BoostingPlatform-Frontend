import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useParams} from 'react-router';
import Box from '@mui/material/Box';
import OfferInfo from '../layouts/offer/OfferInfo';
import OfferPayment from '../layouts/offer/OfferPayment';
import {getOfferData, getOptions} from "src/services/optionApi.js";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const OfferPage = () => {
    const {offerId} = useParams();
    const [options, setOptions] = useState([]);
    const [offerData, setOfferData] = useState(null);
    const [gamePlatforms, setGamePlatforms] = useState([]);

    useEffect(() => {
        if (!offerId) return;

        const fetchData = async () => {
            try {
                const [optionsData, offerData] = await Promise.all([
                    getOptions(offerId),
                    getOfferData(offerId),
                ]);
                setOptions(optionsData);
                setOfferData(offerData);
                setGamePlatforms(offerData.gamePlatforms)
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };

        fetchData();
    }, [offerId]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column', lg: 'row'},
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '1200px',
                mx: 'auto',
                gap: 4,
                px: 2,
                mt: 8,
            }}
        >
            {offerData && (
                <>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}>
                        <OfferInfo offerData={offerData}/>
                    </Box>
                    <Box
                        sx={{
                            width: {xs: '100%', lg: 400},
                            flexShrink: 0,
                        }}>
                        <OfferPayment
                            offerData={offerData}
                            optionsBlocks={options}
                            gamePlatforms={gamePlatforms}
                        />
                    </Box>
                </>
            )}
            {!offerData && (
                <Box sx={{minHeight: '100vh', pt: '20%'}}>
                    <CustomLoader height='100%'/>
                </Box>
            )}
        </Box>
    );
};

export default OfferPage;