import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getAllGamesApi} from "../services/gamesApi.js";
import HomeMain from "../layouts/home/HomeMain.jsx";
import {useSelector} from "react-redux";
import {selectRole} from "../store/slice/authSlice.js";
import {BOOSTER_ROLE} from "./constants/roles.js";
import CustomLoader from "../layouts/boosters/utils/ui/CustomLoader.jsx";

const DefaultGameRedirect = () => {
    const role = useSelector(selectRole);
    const navigate = useNavigate();

    useEffect(() => {
        if (role === BOOSTER_ROLE) {
            navigate('/booster/dashboard')
        }
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

    if (role === BOOSTER_ROLE) {
        return (
            <div className="min-h-[100vh]">
                <div className="flex justify-center items-center mt-[40vh]">
                    <CustomLoader height='100%'/>
                </div>
            </div>
        )
    }

    return (
        <HomeMain/>
    )
};

export default DefaultGameRedirect;