import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Box, Button, Chip} from '@mui/material';
import {Link, NavLink} from 'react-router';
import {getGameByIdApi} from "src/services/gamesApi.jsx";
import {getOffersByGameId} from "src/services/offerApi.jsx";

const OffersList = ({gameId}) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [offers, setOffers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [game, setGame] = useState({}); // Начальное значение - пустой массив


    useEffect(() => {
        if (!gameId) return; // Если id нет, не делаем запрос

        const fetchData = async () => {
            try {
                const gameApi = await getGameByIdApi(gameId);
                setGame(gameApi);
                setCategories(gameApi.categories);
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };
        fetchData();
    }, [gameId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newOffers = await getOffersByGameId(game.id);
                setOffers(newOffers);
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };
        fetchData();

    }, [game]);

    return (
        <Box sx={{padding: 2, flex: "1"}}>
            <Typography variant="h6" sx={{marginBottom: 2}}>
                {game.name} Offers
            </Typography>

            <Box sx={{display: 'flex', overflowX: 'auto', marginBottom: 3}}>
                {categories.map((subcategory) => (
                    <Chip
                        key={subcategory.id}
                        label={subcategory.name}
                        clickable
                        onClick={() => setCurrentCategory(subcategory.id)}
                        sx={{marginRight: 1}}
                    />
                ))}
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 2,
                gridAutoRows: 'auto'
            }}>
                {offers.map((offer) => (
                    <NavLink
                        to={`/offer/${offer.id}`}
                    >
                        <Card key={offer.id}
                              sx={{'maxWidth': '300px', display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <CardMedia
                                component="img"
                                image={offer.imageUrl}
                                alt={offer.title}
                                sx={{height: 200, objectFit: 'cover'}}
                            />
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h6">{offer.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {offer.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: 1}}>
                                <Typography variant="body1" color="secondary">
                                    ${offer.price}
                                </Typography>
                                <Button variant="contained" color="primary">
                                    Buy Now
                                </Button>
                            </Box>
                        </Card>
                    </NavLink>
                ))}
            </Box>
        </Box>
    )
}

export default OffersList