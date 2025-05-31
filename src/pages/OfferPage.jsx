import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Box from '@mui/material/Box';
import OfferInfo from '../layouts/offer/OfferInfo';
import OfferPayment from '../layouts/offer/OfferPayment';
import {getOfferData, getOptions} from "src/services/option.jsx";
import {ClipLoader} from "react-spinners";

const OfferPage = () => {
    const {offerId} = useParams();
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

    return (
        <Box className="flex items-center justify-center flex-col lg:items-start lg:flex-row" sx={{mx: 2}}>
            {offerData && (
                <><Box sx={{pl: 20}}>
                    <OfferInfo offerData={offerData}/>
                </Box>
                    <Box className="pl-20">
                        <OfferPayment offerData={offerData} optionsBlocks={options}/>
                    </Box>
                </>
            )}
            {!offerData && (
                <div className="min-h-[100vh]">
                    <div className="flex justify-center items-center mt-[50vh]">
                        <ClipLoader color="#FD980B" size={100} cssOverride={{display: "block", margin: "auto auto"}}/>
                    </div>
                </div>
            )}
        </Box>
    );
};

export default OfferPage;