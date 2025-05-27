import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import {useNavigate} from 'react-router';
import GamesIcon from 'src/assets/games.svg';

const GameSideBar = ({gameList, currentGame}) => {

    const navigate = useNavigate();

    return (
        <div className="hidden md:flex p-4 flex-col">
            <div className="flex space-x-3">
                <img className="w-[25px]" src={GamesIcon}/>
                <div className="kanit-bold text-3xl">
                    GAMES
                </div>
            </div>
            <List color="primary">
                {gameList.map((game) => (
                    <div
                        key={game.secondId}
                        className="relative group mt-2.5 hover:kanit-bold">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${game.imageUrl})` }}
                        >
                            <div  className="absolute inset-0
                                             bg-gradient-to-r
                                             from-[#190050] to-[#190050_80%,#8A5AFF1A_1%]
                                             transition-all duration-300"/>
                        </div>

                        <ListItem
                            button
                            onClick={() => navigate(`/${game.secondId}`)}
                            className="relative z-10 flex justify-between items-center hover:cursor-pointer bg-transparent h-full"
                        >
                            <ListItemText
                                primary={game.name}
                                primaryTypographyProps={{
                                    sx: {
                                        fontFamily: "'Kanit', sans-serif",
                                        fontWeight: currentGame === game.secondId ? 700 : 300,
                                        fontSize: '1.2rem',
                                        textShadow: '0 6px 6px rgba(0, 0, 0, 0.6)',
                                        '&.MuiListItemText-primary': {
                                            fontSize: '1.125rem'
                                        }
                                    }
                                }}
                            />
                            <ListItemIcon></ListItemIcon>
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    )
}

export default GameSideBar