import api from "src/services/api.js";

export const getAllGamesApi = async () => {
    const response = await api.get(`/games/getAllGames`);
    return response.data;
}

export const getGameByIdApi = async (gameId) => {
    const response = await api.get(`/games/getBySecondId/${gameId}`);
    return response.data;
}

export const getGameCategoriesApi = async (gameId) => {
    const response = await api.get(`/games/getCategoriesByGameId/${gameId}`);
    return response.data;
}
