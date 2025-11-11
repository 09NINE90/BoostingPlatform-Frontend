import Box from "@mui/material/Box";

const OffersListBox = ({children, offers = [...Array(1)]}) => {
    return (
        <Box sx={{
            display: offers.length > 0 ? { xs: 'flex', lg: 'grid' } : 'block',
            alignItems: { xs: 'center', lg: 'stretch' },
            flexWrap: 'wrap',
            gridTemplateColumns: { sm: 'repeat(auto-fill, minmax(300px, 1fr))' },
            gap: 4,
            gridAutoRows: 'auto',
            height: { xs: 'auto', xl: '650px' },
            justifyItems: { xs: 'center', lg: 'stretch' },
            justifyContent: { xs: 'center', lg: 'flex-start' },
            width: '100%',
        }}>
            {children}
        </Box>
    )
}

export default OffersListBox;