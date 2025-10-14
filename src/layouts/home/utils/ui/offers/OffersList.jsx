import React, {memo, useEffect, useState, useCallback, useMemo} from 'react';
import {Box, Skeleton} from '@mui/material';
import {getGameByIdApi, getGameCategoriesApi} from "src/services/gamesApi.js";
import {getOffersByRequest} from "src/services/offerApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import EmptyResponse from "src/components/EmptyResponse.jsx";
import OfferCard from "src/layouts/home/utils/ui/offers/OfferCard.jsx";
import CategoriesFilter from "src/layouts/home/utils/ui/offers/CategoriesFilter.jsx";
import OfferPagination from "src/layouts/home/utils/ui/offers/OfferPagination.jsx";
import OffersListBox from "./OffersListBox.jsx";
import OfferCardSkeleton from "./OfferCardSkeleton.jsx";
import CategoriesFilterSkeleton from "./CategoriesFilterSkeleton.jsx";

const OffersList = ({gameId}) => {
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
        setCategoryLoading(true);
        try {
            const categoriesApi = await getGameCategoriesApi(game.id);
            setCategories(categoriesApi);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setCategoryLoading(false);
        }
    }, [game.id]);

    const fetchOffersData = useCallback(async () => {
        if (!game.id) return;
        setOfferLoading(true);
        const request = {
            gameId: game.id,
            category: currentCategory,
            sort: null,
            pageNumber: pageNumber + 1,
            pageSize: employeesPerPage
        };
        try {
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

    const renderCategories = useMemo(() => {
        if (categoryLoading) {
            return (
                <CategoriesFilterSkeleton/>
            );
        }
        return (
            <CategoriesFilter
                categories={categories}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
            />
        )
    }, [categoryLoading, categories, currentCategory, setCurrentCategory]);

    const renderOfferPagination = useMemo(() => {
        if (offers.length < recordTotal) {
            return (
                <OfferPagination
                    totalPages={totalPages}
                    changePage={changePage}
                    currentPage={pageNumber}
                />
            )
        }
    }, [offers, recordTotal, totalPages, changePage, pageNumber]);

    const renderOffersList = useMemo(() => {
        if (offerLoading) {
            return (
                <OffersListBox>
                    {[...Array(10)].map((_, index) => (
                        <OfferCardSkeleton index={index} key={index}/>
                    ))}
                </OffersListBox>
            )
        }

        if (offers.length === 0) {
            return (
                <OffersListBox offers={offers}>
                    <EmptyResponse text={'no offers by filter \'' + currentCategory + '\''} minHeight='40%'/>
                </OffersListBox>
            )
        }

        return (
            <OffersListBox offers={offers}>
                {offers?.map((offer) => (
                    <OfferCard key={offer.id} offer={offer}/>
                ))}
            </OffersListBox>
        )

    }, [offerLoading, offers, currentCategory, pageNumber]);

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
                {game.name || <Skeleton variant="text" width={200} height={40}/>}
                {game.name && ' Offers'}
            </div>
            <>
                {renderCategories}
                {renderOffersList}
                {renderOfferPagination}
            </>
        </Box>
    )
};

export default OffersList;