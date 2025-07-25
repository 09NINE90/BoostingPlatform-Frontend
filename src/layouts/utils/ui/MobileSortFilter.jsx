import {sortKeysTitle} from "src/layouts/boosters/dashboard/utils/OrderSortData.js";
import {Box, Button} from "@mui/material";
import theme from "src/theme/theme.jsx";

const MobileSortFilter = ({sortKeys,handleSort, tempFilters}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            {sortKeys.map((key) => {
                const isActive = tempFilters.sort?.key === key;
                const direction = tempFilters.sort?.asc ? '↑' : '↓';

                return (
                    <Button
                        key={key}
                        variant={isActive ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => handleSort(key)}
                        sx={{
                            justifyContent: 'space-between',
                            color: isActive ? 'white' : theme.palette.text.primary,
                            fontWeight: isActive ? theme.typography.fontWeightBold : theme.typography.fontWeightLight,
                            backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                        }}
                    >
                        {sortKeysTitle.get(key)}
                        {isActive && <span>{direction}</span>}
                    </Button>
                );
            })}
        </Box>
    )
}

export default MobileSortFilter;