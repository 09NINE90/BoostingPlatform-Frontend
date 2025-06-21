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
    avatar: "https://mos.gallery/upload/iblock/73a/73aa1e03826e05eafea7ec1da14d4b4e.jpg",
    status: "idle",
    error: null,
    customerDiscountPercentage: null,
    customerStatus: null,
    customerCashbackBalance: null,
    boosterLevel: null,
    boosterPercentageOfOrder: null,
    boosterBalance: null,
    boosterTotalIncome: null,
    boosterTotalTips: null,
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
        clearAuth: () => ({ ...initialState }),
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setSecondId: (state, action) => {
            state.secondId = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setCountCartItems: (state, action) => {
            state.countCartItems = action.payload;
        },
        setCustomerDiscountPercentage: (state, action) => {
            state.customerDiscountPercentage = action.payload;
        },
        setCustomerStatus: (state, action) => {
            state.customerStatus = action.payload;
        },
        setCustomerCashbackBalance: (state, action) => {
            state.customerCashbackBalance = action.payload;
        },
        setBoosterLevel: (state, action) => {
            state.boosterLevel = action.payload;
        },
        setBoosterPercentageOfOrder: (state, action) => {
            state.boosterPercentageOfOrder = action.payload;
        },
        setBoosterBalance: (state, action) => {
            state.boosterBalance = action.payload;
        },
        setBoosterTotalIncome: (state, action) => {
            state.boosterTotalIncome = action.payload;
        },
        setBoosterTotalTips: (state, action) => {
            state.boosterTotalTips = action.payload;
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

export const selectCustomerDiscountPercentage = (state) => state.auth.customerDiscountPercentage;
export const selectCustomerStatus = (state) => state.auth.customerStatus;
export const selectCustomerCashbackBalance = (state) => state.auth.customerCashbackBalance;

export const selectBoosterLevel = (state) => state.auth.boosterLevel;
export const selectBoosterPercentageOfOrder = (state) => state.auth.boosterPercentageOfOrder;
export const selectBoosterBalance = (state) => state.auth.boosterBalance;
export const selectBoosterTotalIncome = (state) => state.auth.boosterTotalIncome;
export const selectBoosterTotalTips = (state) => state.auth.boosterTotalTips;

export const {
    setCountCartItems,
    setToken,
    setAuth,
    setRole,
    clearAuth,
    setUsername,
    setAvatar,
    setCustomerDiscountPercentage,
    setCustomerStatus,
    setCustomerCashbackBalance,
    setBoosterLevel,
    setBoosterPercentageOfOrder,
    setBoosterBalance,
    setBoosterTotalIncome,
    setBoosterTotalTips,
    setEmail,
    setSecondId
} = authSlice.actions;

export default authSlice.reducer;
