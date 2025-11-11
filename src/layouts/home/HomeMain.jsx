import React, {useEffect, useState} from 'react'
import GameSideBar from './utils/ui/gameSidebar/GameSideBar.jsx'
import OffersList from "./utils/ui/offers/OffersList.jsx"
import {useNavigate, useParams} from 'react-router'
import {getAllGamesApi} from "src/services/gamesApi.js";
import Carousel from "./utils/ui/carousel/Carousel.jsx";
import {getCarouselItemsApi} from "src/services/offerApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {selectRole} from "../../store/slice/authSlice.js";
import {BOOSTER_ROLE} from "../../utils/constants/roles.js";
import CustomLoader from "../boosters/utils/ui/CustomLoader.jsx";

const HomeMain = () => {
    const {id} = useParams();

    const role = useSelector(selectRole);

    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [currentGameId, setCurrentGameId] = useState(id);
    const [carouselItems, setCarouselItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    window.history.replaceState('', '', `/${currentGameId}`)

    useEffect(() => {
        if (role === BOOSTER_ROLE) {
            navigate('/booster/dashboard')
        }
        if (!id) return;

        const fetchAllData = async () => {
            setIsLoading(true);
            try {
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
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, [id]);

    if (role === BOOSTER_ROLE) {
        return (
            <div className="min-h-[100vh]">
                <div className="flex justify-center items-center mt-[40vh]">
                    <CustomLoader height='100%'/>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
        <div className='flex flex-col'>
            <>
                <Box sx={{display: {xs: 'none', md: 'block'}}}>
                    <Carousel
                        carouselItems={carouselItems}
                        isLoading={isLoading}
                    />
                    <div className="w-[100%] max-w-[1200px] border-t-2 border-background-paper my-8 mx-auto"/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', lg: 'row'},
                    gap: {xs: 2, md: 5}
                }}>
                    <GameSideBar gameList={games}
                                 currentGame={currentGameId}
                                 onGameSelect={setCurrentGameId}
                                 isLoading={isLoading}
                    />
                    <OffersList gameId={currentGameId}/>
                </Box>
            </>
        </div>
    );
}

export default HomeMain