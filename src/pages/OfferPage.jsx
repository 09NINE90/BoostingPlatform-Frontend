import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router';
import Box from '@mui/material/Box';
import OfferInfo from '../layouts/offer/OfferInfo';
import OfferPayment from '../layouts/offer/OfferPayment';
import {getOfferData, getOptions} from "src/services/optionApi.js";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import {AuthModal} from "src/components/authorization/AuthModal.jsx";
import {SIGN_IN_STATE} from "src/utils/constants/authForm.js";

const OfferPage = () => {
    const {offerId} = useParams();
    const [options, setOptions] = useState([]);
    const [offerData, setOfferData] = useState(null);
    const [modelType, setModalType] = useState(SIGN_IN_STATE);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gamePlatforms, setGamePlatforms] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!offerId) return;

        const fetchData = async () => {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [offerId]);

    const toggleModal = useCallback(() => {
        setModalIsOpen((prev) => !prev);
    }, [setModalIsOpen]);

    const renderModal = useMemo(() => {
        return (
            <AuthModal
                modalIsOpen={modalIsOpen}
                toggleModal={toggleModal}
                modelType={modelType}
                setModalType={setModalType}
            />
        )
    }, [modalIsOpen, toggleModal, modelType, setModalType])

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return (
            <CustomLoader/>
        )
    }

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
                        setModalIsOpen={setModalIsOpen}
                        offerData={offerData}
                        optionsBlocks={options}
                        gamePlatforms={gamePlatforms}
                    />
                </Box>
            </>
            {renderModal}
        </Box>
    );
};

export default OfferPage;