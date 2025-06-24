import api from "src/services/api.js";

export const getCustomerProfileData = async () => {
    const response = await api.get(`/user/getCustomerProfileData`);
    return response.data;
}

export const getBoosterProfileData = async () => {
    const response = await api.get(`/user/getBoosterProfileData`);
    return response.data;
}

export const changeNickname = async (nickname) => {
    const response = await api.post(`/user/changeNickname`, null, {params: {nickname: nickname}});
    return response.data;
}