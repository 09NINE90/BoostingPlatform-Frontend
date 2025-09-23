import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getAllGamesApi} from "../services/gamesApi.js";
import CustomLoader from "../layouts/boosters/utils/ui/CustomLoader.jsx";

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
        <div className="min-h-[100vh]">
            <div className="flex justify-center items-center mt-[40vh]">
                <CustomLoader height='100%'/>
            </div>
        </div>
    )
};

export default DefaultGameRedirect;