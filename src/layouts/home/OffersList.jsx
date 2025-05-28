import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {getGameByIdApi} from "src/services/gamesApi.jsx";
import {getOffersByRequest} from "src/services/offerApi.jsx";
import ErrorPage, {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";
import OfferCard from "src/layouts/home/OfferCard.jsx";
import CategoriesFilter from "src/layouts/home/CategoriesFilter.jsx";
import OfferPagination from "src/layouts/home/OfferPagination.jsx";

const OffersList = ({gameId}) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [offers, setOffers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [game, setGame] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [recordTotal, setRecordTotal] = useState(20);

    const employeesPerPage = 12;

    useEffect(() => {
        if (!gameId) return;
        const fetchData = async () => {
            try {
                const gameApi = await getGameByIdApi(gameId);
                setGame(gameApi);
                setCategories(gameApi.categories);
            } catch (err) {
                setError(handleApiError(err))
            }
        };
        fetchData();
    }, [gameId]);

    useEffect(() => {
        if (!game.id) return;
        const request = {
            gameId: game.id,
            category: currentCategory,
            sort: null,
            pageNumber: pageNumber + 1,
            pageSize: employeesPerPage
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const newOffers = await getOffersByRequest(request);
                setOffers(newOffers.offers);
                setTotalPages(newOffers.pageTotal)
                setRecordTotal(newOffers.recordTotal)
            } catch (err) {
                setError(handleApiError(err))
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [game, currentCategory, pageNumber]);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    return (
        <>
            {error && (
                <ErrorPage error={error}/>
            )}
            {!error && (
                <Box sx={{padding: 2, flex: "1"}}>
                    <div className="kanit-bold text-2xl mb-2">
                        {game.name} Offers
                    </div>
                    <CategoriesFilter categories={categories} setCurrentCategory={setCurrentCategory}/>
                    {offers && (
                        <>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: 2,
                                gridAutoRows: 'auto'
                            }}>
                                {offers.map((offer) => (
                                    <OfferCard offer={offer}/>
                                ))}
                            </Box>
                            {offers.length < recordTotal && (
                                <OfferPagination totalPages={totalPages} changePage={changePage}/>
                            )}
                        </>
                    )}
                    {!loading && offers.length === 0 && (
                        <EmptyResponse text={'no offers by filter \'' + currentCategory + '\''}/>
                    )}
                </Box>
            )}
        </>
    )
}

export default OffersList