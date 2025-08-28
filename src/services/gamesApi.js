import api from "src/services/api.js";

export const getAllGamesApi = async () => {
    const response = await api.get(`/games`);
    return response.data;
}

export const getGamesNames = async () => {
    const response = await api.get(`/games/names`);
    return response.data;
}

export const getGameByIdApi = async (gameId) => {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
}

export const getGameCategoriesApi = async (gameId) => {
    const response = await api.get(`/games/${gameId}/categories`);
    return response.data;
}
