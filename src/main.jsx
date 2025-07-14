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
import Orders from './layouts/boosters/ordersByBooster/Orders.jsx';
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
import BalanceHistoryPage from "src/pages/BalanceHistoryPage.jsx";
import ChatComponent from "src/components/chats/ChatComponent.jsx";
import BoosterChat from "src/components/chats/booster/BoosterChat.jsx";
import CustomerChat from "src/components/chats/customer/CustomerChat.jsx";
import BecomeBoosterPage from "src/pages/BecomeBoosterPage.jsx";

const root = document.getElementById('root');

export const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer position="top-right" autoClose={1000}
                            toastClassName="custom-toast"
                            bodyClassName="custom-toast-body"
                            className="mt-20 mr-4"/>
            <Routes>
                <Route path="/" element={<Navigate to="/LoE" replace/>}/>
                <Route path="/confirmSignUp/:tokenParam" element={<EmailConfirmationPage/>}/>

                <Route path='/chat/:chatId' element={<ChatComponent/>}/>

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
                    <Route element={<HomePage/>}>
                        <Route index path="chat/:chatId/:orderId" element={<CustomerChat/>}/>
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={BOOSTER_ROLE}/>}>
                    <Route path="/booster" element={<BoosterMainPage/>}>
                        <Route index path="dashboard" element={<Dashboard/>}/>
                        <Route path="orders" element={<Orders/>}></Route>
                        <Route path="orderDetail/:uuid" element={<OrderDetailPage/>}></Route>
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
