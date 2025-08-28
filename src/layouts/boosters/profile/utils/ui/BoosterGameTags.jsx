import {Box, Chip, Typography} from "@mui/material";
import theme from "src/theme/theme.jsx";
import HelpIconWithTooltip from "src/layouts/utils/ui/HelpIconWithTooltip.jsx";
import React from "react";
import {GAME_TAGS_TOOLTIP} from "src/utils/constants/TooltipsTexts.js";

const BoosterGameTags = ({gameTags}) => {
    if (gameTags) {
        return (
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <HelpIconWithTooltip
                        tooltipTitle={GAME_TAGS_TOOLTIP}/>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.third.main,
                            fontWeight: theme.typography.fontWeightLight,
                            alignSelf: 'flex-start',
                        }}
                    >
                        Game tags:
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', flexWrap: 'wrap', mt: 2, gap: 1}}>
                    {gameTags?.map((tag) => (
                        <Chip
                            key={tag.id}
                            label={tag.name}
                            sx={{
                                marginTop: 1,
                                marginInline: 0.5,
                                color: theme.palette.text.primary,
                                fontWeight: theme.typography.fontWeightLight,
                            }}
                        />
                    ))}
                </Box>
            </Box>
        )
    }
}

export default BoosterGameTags;