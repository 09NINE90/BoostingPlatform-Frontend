import React, {useEffect, useState} from 'react'
import GameSideBar from './gameSidebar/GameSideBar.jsx'
import OffersList from "./OffersList"
import {useParams} from 'react-router'
import {getAllGamesApi} from "src/services/gamesApi.jsx";
import Carousel from "./Carousel.jsx";
import {PacmanLoader} from "react-spinners";
import {getCarouselItemsApi} from "src/services/offerApi.jsx";
import ErrorPage, {handleApiError} from "src/layouts/error/ErrorPage.jsx";

const HomeMain = () => {
    const {id} = useParams();
    const [games, setGames] = useState([]);
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            {loading &&
                (
                    <div className="flex justify-center items-center h-screen">
                        <PacmanLoader color="#FD980B" size={50} cssOverride={{display: "block", margin: "0 auto"}}/>
                    </div>
                )}
            {!loading && (
                <>
                    {error && (
                        <ErrorPage error={error}/>
                    )}
                    <div className='flex flex-col'>
                        {!error && (
                            <>
                                <Carousel carouselItems={carouselItems}/>
                                <div className="w-[100%] max-w-[1200px] border-t-2 border-[#19054D] mt-10 mx-auto"/>
                                <div className='flex flex-row gap-5  mt-6'>
                                    <GameSideBar gameList={games} currentGame={id}/>
                                    <OffersList gameId={id}/>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default HomeMain