import {store} from "src/store/store.js";
import {clearAuth, selectToken, setAuth, setRole, setToken} from "src/store/slice/authSlice.js";
import {refreshAccessToken} from "src/services/authApi.js";
import axios from "axios";
import {toast} from "react-toastify";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, newToken = null) => {
    failedRequestsQueue.forEach(promise => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(newToken);
        }
    });
    failedRequestsQueue = [];
};

api.interceptors.request.use(
    config => {
        if (config.url?.includes('/auth/refresh') ||
            config.url?.includes('/auth/signIn')) {
            return config;
        }

        const token = selectToken(store.getState());
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes('/auth/refresh') ||
            originalRequest.url?.includes('/auth/signIn')) {
            return Promise.reject(error);
        }

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({resolve, reject});
                })
                    .then(newToken => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const {accessToken, role} = await refreshAccessToken();

                store.dispatch(setToken(accessToken));
                store.dispatch(setRole(role));
                store.dispatch(setAuth(true));

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                processQueue(null, accessToken);

                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearAuth());
                toast.warn('The authorization token has expired. Please log in again.');
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;