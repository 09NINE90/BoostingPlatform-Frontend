import {Box, Chip} from "@mui/material";
import React from "react";

const CategoriesFilter = ({categories, setCurrentCategory}) => {
    return (
        <Box sx={{display: 'flex', overflowX: 'auto', marginBottom: 3}}>
            {categories.length > 0 && (
                <Chip
                    label="Clear filters"
                    clickable
                    onClick={() => setCurrentCategory(null)}
                    sx={{marginRight: 1, backgroundColor: '#19054D', ":hover": {backgroundColor: '#e68900'}}}
                />
            )}
            {categories.map((subcategory) => (
                <Chip
                    key={subcategory.id}
                    label={subcategory.name}
                    clickable
                    onClick={() => setCurrentCategory(subcategory.name)}
                    sx={{marginRight: 1}}
                />
            ))}
        </Box>
    )
}

export default CategoriesFilter;