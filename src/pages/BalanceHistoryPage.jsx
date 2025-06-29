import BalanceHistory from "src/layouts/boosters/balance/BalanceHistory.jsx";
import Footer from "src/layouts/common/footer/Footer.jsx";
import {Box} from "@mui/material";

const BalanceHistoryPage = () => {
    return (
        <>

            <Box sx={{
                gap: 3,
                padding: 3,
                display: 'flex',
                paddingInline: 25,
                height: 'fit-content',
                flexDirection: 'column',
            }}>
                <BalanceHistory/>
            </Box>
            <Footer/>
        </>
    )
}

export default BalanceHistoryPage;