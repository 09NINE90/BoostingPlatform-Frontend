import React, {useEffect, useState} from 'react'
import Promo from "./Promo"
import GameSideBar from './GameSideBar'
import OffersList from "./OffersList"
import { useParams } from 'react-router'
import {getAllGamesApi} from "src/services/gamesApi.jsx";

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

        console.log(games)
        fetchData();
    }, [id]);
    return (
        <div className='flex flex-col' >
            <Promo/>
            <div className='flex flex-row gap-5'>
                <GameSideBar gameList={games} currentGame={id}/>
                <OffersList gameId={id}/>
            </div>
        </div>
    );
}

export default HomeMain