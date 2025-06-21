import api from "src/services/api.js";

export const postAuthenticated = async (credentials) => {
    const response = await api.post(`/auth/signIn`, credentials);
    if (!response.data) {
        throw new Error('Сервер не вернул данные');
    }

    const {role, accessToken } = response.data;

    if (!accessToken ) {
        throw new Error('Access token not received');
    }

    return {
        role: Array.isArray(role) ? role[0] : role,
        token: accessToken
    };
}

export const refreshAccessToken = async () => {
    try {
        const response = await api.post("/auth/refresh");
        const { accessToken, role } = response.data;
        return { accessToken, role };
    } catch (error) {
        throw error;
    }
};

export const postLogout = async () => {
    const response = await api.post(`/auth/logout`);
    return response.data;
}

export const postRegister = async (credentials) => {
    const response = await api.post(`/auth/signUp`, credentials);
    return response.data;
}

export const confirmEmail = async (confirmationToken) => {
    const confirmEmailResponse = await api.post(`/auth/confirmSignUp`, confirmationToken);
    if (!confirmEmailResponse.data) {
        throw new Error('Сервер не вернул данные');
    }

    const {role, accessToken} = confirmEmailResponse.data;

    if (!accessToken) {
        throw new Error('Токен не найден в ответе сервера');
    }

    return {
        role: Array.isArray(role) ? role[0] : role,
        token: accessToken
    };
}
