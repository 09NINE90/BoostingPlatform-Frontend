import api from "src/services/api.js";

/**
 * Заказчик
 */
export const getCustomerProfileData = async () => {
    const response = await api.get(`/customers/me/profile`);
    return response.data;
}

/**
 * Бустер
 */
export const getBoosterProfileData = async () => {
    const response = await api.get(`/boosters/me/profile`);
    return response.data;
}

export const getMiniBoosterProfileData = async (boosterId) => {
    const response = await api.get(`/boosters/${boosterId}/mini-profile`);
    return response.data;
}

export const becomeBooster = async (request) => {
    const response = await api.post(`/boosters/become/request`, request);
    return response.data;
}

/**
 * Общее
 */
export const changeNickname = async (nickname) => {
    const response = await api.post(`/users/me/nickname`, null, {params: {nickname: nickname}});
    return response.data;
}

export const changeDescriptionProfile = async (nickname) => {
    const response = await api.post(`/users/me/description`, null, {params: {description: nickname}});
    return response.data;
}