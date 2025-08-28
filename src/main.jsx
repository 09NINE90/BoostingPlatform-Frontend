import './index.css';
import {persistor, store} from "./store/store";
import {BrowserRouter, matchPath, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import {Provider, useSelector} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import {PersistGate} from "redux-persist/integration/react";
import ProfilePage from "./pages/ProfilePage.jsx"
import BoosterMainPage from './pages/BoosterMainPage.jsx';
import {ADMIN_ROLE, BOOSTER_ROLE, CUSTOMER_ROLE} from './utils/constants/roles.js'
import Dashboard from './layouts/boosters/dashboard/Dashboard.jsx';
import Orders from './layouts/boosters/ordersByBooster/Orders.jsx';
import ProtectedRoute from './utils/routing/ProtectedRoute.jsx';
import {CssBaseline, ThemeProvider} from '@mui/material';
import React, {useEffect, useState} from 'react';
import theme from './theme/theme.jsx';
import HomeMain from './layouts/home/HomeMain.jsx';
import OfferPage from './pages/OfferPage.jsx';
import ProfileBoosterPage from './pages/ProfileBoosterPage.jsx';
import '@fontsource/kanit/100.css';
import '@fontsource/kanit/200.css';
import '@fontsource/kanit/300.css';
import '@fontsource/kanit/400.css';
import '@fontsource/kanit/500.css';
import '@fontsource/kanit/700.css';
import {ToastContainer} from "react-toastify";
import EmailConfirmationPage from "src/pages/EmailConfirmationPage.jsx";
import BalanceHistoryPage from "src/pages/BalanceHistoryPage.jsx";
import BoosterChat from "src/components/chats/booster/BoosterChat.jsx";
import CustomerChat from "src/components/chats/customer/CustomerChat.jsx";
import BecomeBoosterPage from "src/pages/BecomeBoosterPage.jsx";
import ChatPage from "src/pages/ChatPage.jsx";
import FloatingBecomeBoosterButton from "src/utils/FloatingBecomeBoosterButton.jsx";
import {selectAuth} from "src/store/slice/authSlice.js";

const root = document.getElementById('root');

export const App = () => {

    const isAuthenticated = useSelector(selectAuth);
    const [isBecomeBoosterLocation, setBecomeBoosterLocation] = useState(false);
    const becomeBoosterLocation = '/become/booster';

    const titleMatchers = [
        { path: "/booster/dashboard", title: "V-Boost - Dashboard" },
        { path: "/booster/orders", title: "V-Boost - My orders" },
        { path: "/booster/profile", title: "V-Boost - My profile" },
        { path: "/booster/balanceHistory", title: "V-Boost - Balance history" },
        { path: "/booster/chat/:chatId/:orderId", title: "V-Boost - Chat" },
        { path: "/profile", title: "V-Boost - My profile" },
        { path: "/chat/:chatId/:orderId", title: "V-Boost - Chat" },
        { path: "/offer/:offerId", title: "V-Boost - Offer" },
        { path: becomeBoosterLocation, title: "V-Boost - Booster Application Form" },
    ];

    const TitleUpdater = () => {
        const location = useLocation();

        useEffect(() => {
            const matched = titleMatchers.find(({path}) =>
                matchPath({path, end: false}, location.pathname)
            );
            document.title = matched
                ? matched.title
                : "V-Boost - Professional Game Boosting Service";

            setBecomeBoosterLocation(location.pathname === becomeBoosterLocation);
        }, [location]);

        return null;
    }

    return (
        <BrowserRouter>
            <TitleUpdater/>
            {!isAuthenticated && !isBecomeBoosterLocation &&(
                <FloatingBecomeBoosterButton/>
            )}
            <ToastContainer position="top-right" autoClose={1000}
                            toastClassName="custom-toast"
                            bodyClassName="custom-toast-body"
                            className="mt-20 mr-4"
            />
            <Routes>
                <Route path="/" element={<Navigate to="/LoE" replace/>}/>
                <Route path="/confirmSignUp/:tokenParam" element={<EmailConfirmationPage/>}/>

                <Route element={<HomePage/>}>
                    <Route path=":id" element={<HomeMain/>}></Route>
                    <Route path="/games/:id" element={<HomeMain/>}></Route>
                    <Route path="/offer/:offerId" element={<OfferPage/>}></Route>
                    <Route path="/become/booster" element={<BecomeBoosterPage/>}></Route>
                </Route>

                <Route element={<ProtectedRoute isAuthCheck={true}/>}>
                    <Route path="/profile" element={<ProfilePage/>}></Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={CUSTOMER_ROLE}/>}>
                    <Route element={<ChatPage/>}>
                        <Route index path="chat/:chatId/:orderId" element={<CustomerChat/>}/>
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={BOOSTER_ROLE}/>}>
                    <Route path="/booster" element={<BoosterMainPage/>}>
                        <Route index path="dashboard" element={<Dashboard/>}/>
                        <Route path="orders" element={<Orders/>}></Route>
                        <Route path="balanceHistory" element={<BalanceHistoryPage/>}></Route>
                        <Route path="profile" element={<ProfileBoosterPage/>}></Route>
                        <Route path="chat/:chatId/:orderId" element={<BoosterChat/>}></Route>
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
