import React, {useEffect, useState} from 'react';
import {Box, Chip} from '@mui/material';
import {NavLink} from 'react-router';
import {getGameByIdApi} from "src/services/gamesApi.jsx";
import {getOffersByRequest} from "src/services/offerApi.jsx";
import ErrorPage, {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";

const OffersList = ({gameId}) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [offers, setOffers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [game, setGame] = useState({}); // Начальное значение - пустой массив
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!gameId) return;
        const fetchData = async () => {
            try {
                const gameApi = await getGameByIdApi(gameId);
                setGame(gameApi);
                setCategories(gameApi.categories);
            } catch (err) {
                if (err.response?.data) {
                    setError(err.response.data);
                } else {
                    setError({
                        error: "NETWORK_ERROR",
                        message: "Failed to fetch data",
                        status: 500
                    });
                }
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
            pageNumber: 1,
            pageSize: 20
        }

        const fetchData = async () => {
            try {
                const newOffers = await getOffersByRequest(request);
                setOffers(newOffers.offers);
            } catch (err) {
                setError(handleApiError(err))
            }
        };
        fetchData();

    }, [game, currentCategory]);

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
                                                <span className="text-white kanit-light text-lg">$ {offer.price}</span>
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
                    )}
                    {!offers || offers.length === 0 && (
                        <EmptyResponse text={'no offers by filter \'' + currentCategory + '\''}/>
                    )}
                </Box>
            )}
        </>
    )
}

export default OffersList