import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./slice/authSlice.js";

const persistConfig = {
    key: 'auth',
    storage, // Хранилище по умолчанию (localStorage)
    whitelist: ['isAuthenticated', 'role', 'username', 'avatar'], // Только эти поля будут сохраняться
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
});

export const persistor = persistStore(store);
