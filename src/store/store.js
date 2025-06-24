import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./slice/authSlice.js";
import { encryptTransform } from 'redux-persist-transform-encrypt';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: [
        'isAuthenticated',
        'role',
        'username',
        'avatar',
        'token',
        'countCartItems',
        'email',
        'secondId'
    ],
    transforms: [
        encryptTransform({
            secretKey: SECRET_KEY,
            onError: (error) => {
                console.error('Encryption error:', error);
                localStorage.removeItem('persist:auth');
                window.location.reload();
            }
        })
    ]
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
});

export const persistor = persistStore(store);
