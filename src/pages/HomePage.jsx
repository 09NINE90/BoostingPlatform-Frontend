import Header from '../layouts/common/header/Header.jsx';
import { Outlet } from "react-router";
import Footer from '../layouts/common/footer/Footer.jsx';
import { Box } from '@mui/material';

const HomePage = () => {
    return (
        <>
            <Header/>
                <Box>
                    <Outlet/>
                </Box>
            <Footer/>
        </>
    );
};

export default HomePage;