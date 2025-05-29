import axios from "axios";

export const getUserProfileData = async () => {
    const response = await axios.get(`/api/user/getUserProfileData`, {withCredentials: true});
    return response.data;
}

export const changeNickname = async (nickname) => {
    const response = await axios.post(`/api/user/changeNickname`, null,
        {
            params: {nickname: nickname}, withCredentials: true
        });
    return response.data;
}