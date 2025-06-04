import React, {useEffect, useState} from 'react'
import GameSideBar from './utils/ui/gameSidebar/GameSideBar.jsx'
import OffersList from "./utils/ui/offers/OffersList.jsx"
import {useParams} from 'react-router'
import {getAllGamesApi} from "src/services/gamesApi.jsx";
import Carousel from "./utils/ui/Carousel.jsx";
import {getCarouselItemsApi} from "src/services/offerApi.jsx";
import ErrorPage, {handleApiError} from "src/layouts/error/ErrorPage.jsx";
import {ClipLoader} from "react-spinners";

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

    return (
        <>
            {!loading && (
                <>
                    {error && (
                        <ErrorPage error={error}/>
                    )}
                    <div className='flex flex-col'>
                        {!error && (
                            <>
                                <Carousel carouselItems={carouselItems}/>
                                <div className="w-[100%] max-w-[1200px] border-t-2 border-[#19054D] my-8 mx-auto"/>
                                <div className='flex flex-row gap-5]'>
                                    <GameSideBar gameList={games} currentGame={currentGameId} onGameSelect={setCurrentGameId}/>
                                    <OffersList gameId={currentGameId}/>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            {loading && (
                <div className="min-h-[100vh]">
                    <div className="flex justify-center items-center mt-[50vh]">
                        <ClipLoader color="#FD980B" size={100} cssOverride={{display: "block", margin: "auto auto"}}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default HomeMain