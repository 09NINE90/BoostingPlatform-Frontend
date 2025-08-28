import React, {memo, useEffect, useState, useCallback} from 'react';
import {Box} from '@mui/material';
import {getGameByIdApi, getGameCategoriesApi} from "src/services/gamesApi.js";
import {getOffersByRequest} from "src/services/offerApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OfferCard from "src/layouts/home/utils/ui/offers/OfferCard.jsx";
import CategoriesFilter from "src/layouts/home/utils/ui/offers/CategoriesFilter.jsx";
import OfferPagination from "src/layouts/home/utils/ui/offers/OfferPagination.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";

const OffersList = memo(({gameId}) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [offers, setOffers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [game, setGame] = useState({});
    const [error, setError] = useState(null);
    const [offerLoading, setOfferLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [recordTotal, setRecordTotal] = useState(20);

    const employeesPerPage = 8;

    const fetchGameData = useCallback(async () => {
        if (!gameId) return;
        try {
            const gameApi = await getGameByIdApi(gameId);
            setCurrentCategory(null);
            setPageNumber(0);
            setCategories([]);
            setGame(gameApi);
        } catch (err) {
            setError(handleApiError(err));
        }
    }, [gameId]);

    const fetchCategoriesData = useCallback(async () => {
        if (!game.id) return;
        try {
            setCategoryLoading(true);
            const categoriesApi = await getGameCategoriesApi(game.id);
            setCategories(categoriesApi);
            setCategoryLoading(false);
        } catch (err) {
            setError(handleApiError(err));
        }
    }, [game.id]);

    const fetchOffersData = useCallback(async () => {
        if (!game.id) return;
        const request = {
            gameId: game.id,
            category: currentCategory,
            sort: null,
            pageNumber: pageNumber + 1,
            pageSize: employeesPerPage
        };

        try {
            setOfferLoading(true);
            const newOffers = await getOffersByRequest(request);
            setOffers(newOffers.offers);
            setTotalPages(newOffers.pageTotal);
            setRecordTotal(newOffers.recordTotal);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setOfferLoading(false);
        }
    }, [game.id, currentCategory, pageNumber, employeesPerPage]);

    const changePage = useCallback(({selected}) => {
        setPageNumber(selected);
    }, []);

    useEffect(() => {
        if (error) setError(null);
    }, [gameId, currentCategory, pageNumber]);

    useEffect(() => {
        setPageNumber(0);
    }, [currentCategory]);

    useEffect(() => {
        fetchGameData();
    }, [fetchGameData]);

    useEffect(() => {
        fetchCategoriesData();
    }, [fetchCategoriesData]);

    useEffect(() => {
        fetchOffersData();
    }, [fetchOffersData]);

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
        <Box sx={{padding: 2, flex: 1}}>
            <div className="kanit-bold text-2xl mb-2">
                {game.name} Offers
            </div>
            {!categoryLoading && !offerLoading && (
                <>
                    <CategoriesFilter
                        categories={categories}
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                    />
                    {offers && (
                        <>
                            <Box sx={{
                                display: offers.length > 0 ? { xs: 'flex', lg: 'grid' } : 'block',
                                alignItems: { xs: 'center', lg: 'stretch' },
                                flexWrap: 'wrap',
                                gridTemplateColumns: { sm: 'repeat(auto-fill, minmax(300px, 1fr))' },
                                gap: 4,
                                gridAutoRows: 'auto',
                                height: { xs: 'auto', xl: '620px' },
                                justifyItems: { xs: 'center', lg: 'stretch' },
                                justifyContent: { xs: 'center', lg: 'flex-start' },
                                width: '100%',
                            }}>
                                {offers.map((offer) => (
                                    <OfferCard key={offer.id} offer={offer}/>
                                ))}

                                {!offerLoading && offers.length === 0 && (
                                    <EmptyResponse text={'no offers by filter \'' + currentCategory + '\''} minHeight='40%'/>
                                )}
                            </Box>
                            {offers.length < recordTotal && (
                                <OfferPagination
                                    totalPages={totalPages}
                                    changePage={changePage}
                                    currentPage={pageNumber}
                                />
                            )}
                        </>
                    )}
                </>
            )}
            {(categoryLoading || offerLoading) && (
                <Box sx={{height: '100vh'}}>
                    <CustomLoader size={0.8} height='50%'/>
                </Box>
            )}
        </Box>
    )
});

export default OffersList;