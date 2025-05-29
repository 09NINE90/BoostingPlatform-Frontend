import React from 'react';
import {List} from '@mui/material';
import {Games} from "src/assets/icons/index.js";
import GameListItem from "src/layouts/home/gameSidebar/utils/GameListItem.jsx";

const GameSideBar = ({gameList, currentGame}) => {

    return (
        <div className="hidden md:flex p-4 flex-col">
            <div className="flex space-x-3">
                <Games/>
                <div className="kanit-bold text-3xl">
                    GAMES
                </div>
            </div>
            <List color="primary">
                {gameList.map((game) => (
                    <GameListItem game={game} currentGame={currentGame}/>
                ))}
            </List>
        </div>
    )
}

export default GameSideBar