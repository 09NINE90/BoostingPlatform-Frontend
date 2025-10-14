import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getAllGamesApi} from "../services/gamesApi.js";
import HomeMain from "../layouts/home/HomeMain.jsx";

const DefaultGameRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const determineDefaultGame = async () => {
            try {
                const games = await getAllGamesApi();
                const defaultGameId = games.length > 0 ? games[0].secondId : 'LoE';
                navigate(`/${defaultGameId}`, { replace: true });
            } catch (error) {
                navigate('/LoE', { replace: true });
            }
        };

        determineDefaultGame();
    }, [navigate]);

    return (
        <HomeMain/>
    )
};

export default DefaultGameRedirect;