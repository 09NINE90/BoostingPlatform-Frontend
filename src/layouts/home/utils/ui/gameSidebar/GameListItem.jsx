import {ListItem, ListItemText} from "@mui/material";
import React from "react";

const GameListItem = ({game, currentGame, onClick}) => {

    return (
        <div className="relative group mt-2.5 hover:kanit-bold h-[50px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${game.imageUrl})`}}>
                <div className="absolute inset-0
                                                 bg-gradient-to-r
                                                 from-[#190050] to-[#190050_80%,#8A5AFF1A_1%]
                                                 transition-all duration-300"/>
            </div>

            <ListItem
                onClick={onClick}
                className="relative z-10 flex justify-between items-center hover:cursor-pointer bg-transparent h-[50px]"
            >
                <ListItemText
                    primary={game.name}
                    sx={{
                        minWidth: '200px',
                        '& .MuiListItemText-primary': {
                            fontFamily: "'Kanit', sans-serif",
                            fontWeight: currentGame === game.secondId ? 700 : 300,
                            fontSize: '1.2rem',
                            textShadow: '0 6px 6px rgba(0, 0, 0, 0.6)'
                        }
                    }}
                />
            </ListItem>
        </div>
    )
}

export default GameListItem;