import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Глобально включаем отправку куки
axios.defaults.withCredentials = true;

const initialState = {
    isAuthenticated: false,
    role: "",
    username: null,
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
    },
});

export const selectAuth = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;
export const getToken = (state) => state.auth.token;

export const { setAuth, setRole, clearAuth } = authSlice.actions;
export default authSlice.reducer;
