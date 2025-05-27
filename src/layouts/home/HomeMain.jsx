import React, {useEffect, useState} from 'react'
import GameSideBar from './GameSideBar'
import OffersList from "./OffersList"
import {useParams} from 'react-router'
import {getAllGamesApi} from "src/services/gamesApi.jsx";
import Carousel from "./Carousel.jsx";

const HomeMain = () => {
    const {id} = useParams();
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const gamesApi = await getAllGamesApi();
                setGames(gamesApi);
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div className='flex flex-col'>
            <Carousel/>
            <div className="w-[100%] max-w-[1200px] border-t-2 border-[#19054D] mt-10 mx-auto"/>
            <div className='flex flex-row gap-5  mt-6'>
                <GameSideBar gameList={games} currentGame={id}/>
                <OffersList gameId={id}/>
            </div>
        </div>
    );
}

export default HomeMain