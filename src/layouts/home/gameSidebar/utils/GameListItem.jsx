import {ListItem, ListItemText} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import React from "react";
import {useNavigate} from "react-router";

const GameListItem = ({game, currentGame}) => {

    const navigate = useNavigate();

    return (
        <div key={game.secondId}
            className="relative group mt-2.5 hover:kanit-bold">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${game.imageUrl})`}}>
                <div className="absolute inset-0
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
    )
}

export default GameListItem;