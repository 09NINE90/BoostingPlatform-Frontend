import {NavLink} from "react-router";
import React from "react";
import {Box, Button, Tooltip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import {useIsTextOverflowed} from "src/utils/functions.js";

const OfferCard = ({offer}) => {

    const [textRef, isOverflowed] = useIsTextOverflowed();

    return (
        <NavLink to={`/offer/${offer.id}`}>
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90vw', md: 300 },
                    maxWidth: { xs: 380, md: 300 },
                    height: { xs: '90vw', md: 300 },
                    maxHeight: { xs: 380, md: 300 },
                    aspectRatio: '1/1',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    margin: { xs: '0 auto', sm: 0 },
                    '&:hover .offer-description': {
                        whiteSpace: 'normal',
                        overflow: 'visible',
                        textOverflow: 'clip'
                    },
                }}
            >
                <Box
                    component="img"
                    src={offer.imageUrl}
                    alt={offer.title}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        zIndex: 0
                    }}
                />

                {/* Градиентный оверлей */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top, #0A0022, #0A0022b3, #0A002200)',
                        zIndex: 10
                    }}
                />

                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: theme.typography.fontWeightBold,
                            mb: 1,
                        }}
                    >
                        {offer.title}
                    </Typography>

                    <Tooltip
                        title={offer.description}
                        disableHoverListener={!isOverflowed}
                    >
                        <Typography
                            ref={textRef}
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: theme.typography.fontWeightLight,
                                mb: 2,
                                width: '95%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {offer.description}
                        </Typography>
                    </Tooltip>


                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Typography
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: theme.typography.fontWeightLight,
                                fontSize: '1.125rem'
                            }}
                        >
                            $ {offer.price}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.main,
                                },
                                color: theme.palette.text.primary,
                                fontWeight: theme.typography.fontWeightRegular,
                                px: 2,
                                py: 1
                            }}
                        >
                            Buy Now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </NavLink>
    )
}


export default OfferCard;