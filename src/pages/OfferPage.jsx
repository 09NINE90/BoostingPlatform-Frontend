import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import OfferInfo from '../layouts/offer/OfferInfo';
import OfferPayment from '../layouts/offer/OfferPayment';
import { getOfferData, getOptions } from "src/services/option.jsx";

const OfferPage = () => {
    const { offerId } = useParams();
    const [options, setOptions] = useState([]);
    const [offerData, setOfferData] = useState(null);

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
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };

        fetchData();
    }, [offerId]);

    if (!offerData) {
        return <div>Загрузка...</div>;
    }

    return (
        <Box className="flex items-center justify-center flex-col lg:items-start lg:flex-row" sx={{ mx: 2 }}>
            <Box sx={{ pl: 20 }}>
                <OfferInfo offerData={offerData} />
            </Box>
            <Box className="pl-20">
                <OfferPayment offerData={offerData} optionsBlocks={options} />
            </Box>
        </Box>
    );
};

export default OfferPage;