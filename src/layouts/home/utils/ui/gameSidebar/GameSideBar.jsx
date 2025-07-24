import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import {Games} from "src/assets/icons/index.js";
import GameListItem from "src/layouts/home/utils/ui/gameSidebar/GameListItem.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "src/theme/theme.jsx";


const GameSideBar = ({gameList, currentGame, onGameSelect}) => {

    const MobileGameListItem = ({game, currentGame, onClick}) => {
        return (
            <ListItemButton
                onClick={onClick}
                selected={currentGame === game.secondId}
                sx={{
                    py: 1,
                    px: 2,
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.background.paper,
                    }
                }}
            >
                <ListItemText
                    primary=
                        {
                            <Typography
                                variant='h6'
                                sx={{
                                fontWeight: currentGame === game.secondId ? theme.typography.fontWeightBold : theme.typography.fontWeightLight,
                            }}>
                                {game.name}
                            </Typography>
                        }
                />
            </ListItemButton>
        );
    };

    return (
        <>
            <Box sx={{display: {xs: 'none', lg: 'flex'}, p: 2, flexDirection: 'column'}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                    <Games/>
                    <Typography variant="h4" sx={{fontWeight: theme.typography.fontWeightBold}}>
                        GAMES
                    </Typography>
                </Box>
                <List>
                    {gameList.map((game) => (
                        <GameListItem
                            key={game.id}
                            game={game}
                            currentGame={currentGame}
                            onClick={() => onGameSelect(game.secondId)}
                        />
                    ))}
                </List>
            </Box>

            {/* Мобильная версия */}
            <Box sx={{display: {xs: 'block', lg: 'none'}, mb: 2}}>
                <Accordion
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        backgroundImage: 'none',
                        boxShadow: 'none',
                        '&:before': {display: 'none'}
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        sx={{
                            minHeight: 'auto',
                            py: 1,
                            '& .MuiAccordionSummary-content': {
                                alignItems: 'center',
                                gap: 1
                            }
                        }}
                    >
                        <Games sx={{fontSize: '1.5rem'}}/>
                        <Typography variant="h5" sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Select Game
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{pt: 0, px: 0}}>
                        <List dense>
                            {gameList.map((game) => (
                                <MobileGameListItem
                                    key={game.id}
                                    game={game}
                                    currentGame={currentGame}
                                    onClick={() => onGameSelect(game.secondId)}
                                />
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};

export default GameSideBar;