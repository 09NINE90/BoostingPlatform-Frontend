import {store} from "../store/store.js";

import axios from "axios";
import {selectToken} from "src/store/slice/authSlice.js";

export const getAuthenticated = async () => {
    const authenticatedResponse = await axios.get(`/api/auth/me`);
    if (authenticatedResponse.data) {
        const {role, token} = authenticatedResponse.data;

        return ({
            roles: role,
            token,
        });
    }

    return authenticatedResponse.data;
};

export const postAuthenticated = async (credentials) => {
    const authenticatedResponse = await axios.post(`/api/auth/signIn`, credentials, {withCredentials: true});
    if (!authenticatedResponse.data) {
        throw new Error('Сервер не вернул данные');
    }

    const {role, token} = authenticatedResponse.data;

    if (!token) {
        throw new Error('Токен не найден в ответе сервера');
    }

    return {
        role: Array.isArray(role) ? role[0] : role,
        token: token
    };


}

export const postRegister = async (credentials) => {
    const authenticatedResponse = await axios.post(`/api/auth/signUp`, credentials, {withCredentials: true});
    return authenticatedResponse.data;
}

export const confirmEmail = async (confirmationToken) => {
    const confirmEmailResponse = await axios.post(`/api/auth/confirmSignUp`, confirmationToken, {withCredentials: false});
    if (!confirmEmailResponse.data) {
        throw new Error('Сервер не вернул данные');
    }

    const {role, token} = confirmEmailResponse.data;

    if (!token) {
        throw new Error('Токен не найден в ответе сервера');
    }

    return {
        role: Array.isArray(role) ? role[0] : role,
        token: token
    };
}

axios.interceptors.request.use(config => {
    const token = selectToken(store.getState());
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});