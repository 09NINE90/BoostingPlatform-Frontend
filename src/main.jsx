import './index.css';
import {persistor, store} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import {PersistGate} from "redux-persist/integration/react";
import ProfilePage from "./pages/ProfilePage.jsx"
import BoosterMainPage from './pages/BoosterMainPage.jsx';
import {ADMIN_ROLE, CUSTOMER_ROLE, BOOSTER_ROLE} from './utils/constants/roles.js'
import Dashboard from './layouts/boosters/dashboard/Dashboard.jsx';
import Orders from './layouts/boosters/Orders.jsx';
import OrderDetailPage from './pages/OrderDetailPage.jsx';
import ProtectedRoute from './utils/routing/ProtectedRoute.jsx';
import {ThemeProvider, CssBaseline} from '@mui/material';
import React from 'react';
import theme from './theme/theme.jsx';
import HomeMain from './layouts/home/HomeMain.jsx';
import OfferPage from './pages/OfferPage.jsx';
import {Navigate} from 'react-router-dom';
import ProfileBoosterPage from './pages/ProfileBoosterPage.jsx';
import '@fontsource/kanit/100.css';
import '@fontsource/kanit/200.css';
import '@fontsource/kanit/300.css';
import '@fontsource/kanit/400.css';
import '@fontsource/kanit/500.css';
import '@fontsource/kanit/700.css';
import {ToastContainer} from "react-toastify";
import EmailConfirmationPage from "src/pages/EmailConfirmationPage.jsx";

const root = document.getElementById('root');

export const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer position="bottom-left" autoClose={2000}
                            toastClassName="custom-toast"
                            bodyClassName="custom-toast-body"/>
            <Routes>
                <Route path="/" element={<Navigate to="/LoE" replace/>}/>
                <Route path="/confirmSignUp/:tokenParam" element={<EmailConfirmationPage />} />

                <Route element={<HomePage/>}>
                    <Route path=":id" element={<HomeMain/>}></Route>
                    <Route path="/games/:id" element={<HomeMain/>}></Route>
                    <Route path="/offer/:offerId" element={<OfferPage/>}></Route>
                </Route>

                <Route element={<ProtectedRoute isAuthCheck={true}/>}>
                    <Route exact path="/profile" element={<ProfilePage/>}></Route>
                </Route>
                <Route element={<ProtectedRoute allowedRoles={BOOSTER_ROLE}/>}>
                    <Route exact path="/booster" element={<BoosterMainPage/>}>
                        <Route index path="dashboard" element={<Dashboard/>}/>
                        <Route exact path="orders" element={<Orders/>}></Route>
                        <Route exact path="orderDetail/:uuid" element={<OrderDetailPage/>}></Route>
                        <Route path="profile" element={<ProfileBoosterPage/>}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

createRoot(root).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
