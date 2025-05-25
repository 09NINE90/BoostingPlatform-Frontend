import { store } from "../store/store.js";

import axios from "axios";

export const getAuthenticated = async () => {
    const authenticatedResponse = await axios.get(`/api/auth/me`);
    if (authenticatedResponse.data) {
        const {roles, token} = authenticatedResponse.data;
        console.log('token', token, 'roles', roles[0]);

        return ({
            roles: roles[0],
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

    const { roles, token } = authenticatedResponse.data;

    if (!token) {
        throw new Error('Токен не найден в ответе сервера');
    }

    return {
        roles: Array.isArray(roles) ? roles[0] : roles,
        token: token
    };

}

export const postLogout = async () => {
    // const authenticatedResponse = await axios.post(`/api/auth/logout`, {}, {withCredentials: true});
    // const logout = authenticatedResponse.data;

    return ({logout});
}

export const postRegister = async (credentials) => {
    const authenticatedResponse = await axios.post(`/api/auth/signUp`, credentials, { withCredentials: true });

    const {roles, token} = authenticatedResponse.data;
    return ({roles});
}

axios.interceptors.request.use((config) => {
    if(localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    return config;
})