import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Глобально включаем отправку куки
axios.defaults.withCredentials = true;

const initialState = {
    isAuthenticated: false,
    role: "",
    username: null,
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
        clearAuth: () => initialState,
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        }
    },
});

export const selectAuth = (state) => state.auth.isAuthenticated;
export const selectUsername = (state) => state.auth.username;
export const selectAvatar = (state) => state.auth.avatar;
export const selectRole = (state) => state.auth.role;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;

export const { setAuth, setRole, clearAuth, setUsername, setAvatar} = authSlice.actions;
export default authSlice.reducer;
