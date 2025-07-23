import React, {useEffect, useState} from 'react'
import GameSideBar from './utils/ui/gameSidebar/GameSideBar.jsx'
import OffersList from "./utils/ui/offers/OffersList.jsx"
import {useParams} from 'react-router'
import {getAllGamesApi} from "src/services/gamesApi.js";
import Carousel from "./utils/ui/Carousel.jsx";
import {getCarouselItemsApi} from "src/services/offerApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import {Box} from "@mui/material";

const HomeMain = () => {
    const {id} = useParams();
    const [games, setGames] = useState([]);
    const [currentGameId, setCurrentGameId] = useState(id);
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    window.history.replaceState('', '', `/${currentGameId}`)

    useEffect(() => {
        if (!id) return;

        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [gamesApi, carouselApi] = await Promise.all([
                    getAllGamesApi(),
                    getCarouselItemsApi()
                ]);

                setGames(gamesApi);
                setCarouselItems(carouselApi);
            } catch (err) {
                setError(handleApiError(err))
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [id]);

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    if (loading) {
        return (
            <div className="min-h-[100vh]">
                <div className="flex justify-center items-center mt-[40vh]">
                    <CustomLoader height='100%'/>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='flex flex-col'>
                <>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Carousel carouselItems={carouselItems}/>
                        <div className="w-[100%] max-w-[1200px] border-t-2 border-background-paper my-8 mx-auto"/>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 5 }
                    }}>
                        <GameSideBar gameList={games} currentGame={currentGameId} onGameSelect={setCurrentGameId}/>
                        <OffersList gameId={currentGameId}/>
                    </Box>
                </>
            </div>
        </>
    );
}

export default HomeMain