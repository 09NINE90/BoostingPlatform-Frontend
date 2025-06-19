import api from "src/services/api.js";

export const getUserProfileData = async () => {
    const response = await api.get(`/user/getUserProfileData`);
    return response.data;
}

export const changeNickname = async (nickname) => {
    const response = await api.post(`/user/changeNickname`, null, {params: {nickname: nickname}});
    return response.data;
}