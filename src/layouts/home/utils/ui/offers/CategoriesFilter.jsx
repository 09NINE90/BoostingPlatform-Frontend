import {Box, Chip} from "@mui/material";
import React from "react";

const CategoriesFilter = ({categories, currentCategory, setCurrentCategory}) => {
    return (
        <Box
            sx={{
                gap: 1,
                display: 'flex',
                flexWrap: 'wrap',
                overflowX: 'auto',
                mb: 3,
            }}>
            {categories.length > 0 && (
                <Chip
                    label="Clear filters"
                    clickable
                    onClick={() => setCurrentCategory(null)}
                    sx={{
                        flexShrink: 0,
                        backgroundColor: '#19054D',
                        ":hover": {backgroundColor: '#e68900'}
                    }}
                />
            )}
            {categories.map((subcategory) => (
                <Chip
                    key={subcategory.id}
                    label={subcategory.name}
                    clickable
                    onClick={() => setCurrentCategory(subcategory.name)}
                    sx={{
                        flexShrink: 0,
                        color: 'white',
                        ...(currentCategory === subcategory.name && {
                            bgcolor: 'primary.main',
                            color: '#0A0022',
                        })
                    }}
                />
            ))}
        </Box>
    )
}

export default CategoriesFilter;