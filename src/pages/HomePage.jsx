import Header from '../layouts/common/header/Header.jsx';
import { Outlet } from "react-router";
import '../styles/HomePage.css';
import Footer from '../layouts/common/Footer/Footer.jsx';
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