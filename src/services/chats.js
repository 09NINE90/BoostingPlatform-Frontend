import api from "src/services/api.js";

export const getChatRoom = async (roomId) => {
    const response = await api.get(`/chat/room/${roomId}`);
    return response.data;
};