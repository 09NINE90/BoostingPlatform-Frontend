import React, {useEffect, useState} from 'react';
import {Box, Chip} from '@mui/material';
import {NavLink} from 'react-router';
import {getGameByIdApi} from "src/services/gamesApi.jsx";
import {getOffersByRequest} from "src/services/offerApi.jsx";
import ErrorPage, {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";
import ReactPaginate from "react-paginate";

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

                    <Box sx={{display: 'flex', overflowX: 'auto', marginBottom: 3}}>
                        <Chip
                            label="Clear filters"
                            clickable
                            onClick={() => setCurrentCategory(null)}
                            sx={{marginRight: 1, backgroundColor: '#19054D', ":hover": {backgroundColor: '#e68900'}}}
                        />
                        {categories.map((subcategory) => (
                            <Chip
                                key={subcategory.id}
                                label={subcategory.name}
                                clickable
                                onClick={() => setCurrentCategory(subcategory.name)}
                                sx={{marginRight: 1}}
                            />
                        ))}
                    </Box>
                    {offers && (
                        <>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: 2,
                                gridAutoRows: 'auto'
                            }}>
                                {offers.map((offer) => (
                                    <NavLink to={`/offer/${offer.id}`}>
                                        <div
                                            className="group relative w-full max-w-[300px] h-[300px] flex flex-col overflow-hidden">
                                            <img
                                                src={offer.imageUrl}
                                                alt={offer.title}
                                                className="absolute top-0 left-0 w-full h-full object-fill z-0"
                                            />

                                            <div
                                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A0022] via-[#0A0022b3] to-[#0A002200] z-10"/>

                                            <div className="relative z-20 flex flex-col h-full justify-end p-4">
                                                <h2 className="text-white kanit-bold text-xl mb-2">{offer.title}</h2>

                                                <p className="text-white/90 kanit-light mb-4 truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-clip">
                                                    {offer.description}
                                                </p>

                                                <div className="flex justify-between items-end">
                                                    <span
                                                        className="text-white kanit-light text-lg">$ {offer.price}</span>
                                                    <button
                                                        className="bg-[#FD980B] hover:bg-[#e68900] text-white font-medium px-4 py-2 rounded">
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </Box>
                            {offers.length < recordTotal && (
                                <div className="py-6">
                                    <ReactPaginate
                                        previousLabel={null}
                                        nextLabel={null}
                                        pageCount={totalPages}
                                        onPageChange={changePage}
                                        containerClassName="flex justify-center items-center gap-1 kanit-bold list-none"
                                        pageLinkClassName="flex items-center justify-center w-10 h-10 border border-[#004772] text-[#004772] cursor-pointer hover:border-white hover:text-white transition-colors duration-200"
                                        activeLinkClassName="border-white text-white"
                                        disabledClassName="opacity-50 cursor-not-allowed"
                                        breakLabel="..."
                                        breakClassName="text-[#004772] px-2"
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={3}
                                    />
                                </div>
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