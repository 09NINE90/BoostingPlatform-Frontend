import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
    isAuthenticated: false,
    role: "",
    token: null,
    countCartItems: 0,
    email: null,
    secondId: null,
    username: null,
    description: null,
    avatar: "https://mos.gallery/upload/iblock/73a/73aa1e03826e05eafea7ec1da14d4b4e.jpg",
    status: "idle",
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearAuth: () => ({...initialState}),
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setSecondId: (state, action) => {
            state.secondId = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setCountCartItems: (state, action) => {
            state.countCartItems = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('persist/REHYDRATE', (state, action) => {
            if (action.error) {
                return initialState;
            }
        });
    }
});

export const selectAuth = (state) => state.auth.isAuthenticated;
export const selectUsername = (state) => state.auth.username;
export const selectEmail = (state) => state.auth.email;
export const selectSecondId = (state) => state.auth.secondId;
export const selectAvatar = (state) => state.auth.avatar;
export const selectRole = (state) => state.auth.role;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;
export const selectToken = (state) => state.auth.token;
export const selectCountCartItems = (state) => state.auth.countCartItems;
export const selectDescription = (state) => state.auth.description;

export const {
    setCountCartItems,
    setToken,
    setAuth,
    setRole,
    clearAuth,
    setUsername,
    setAvatar,
    setEmail,
    setSecondId,
    setDescription
} = authSlice.actions;

export default authSlice.reducer;
