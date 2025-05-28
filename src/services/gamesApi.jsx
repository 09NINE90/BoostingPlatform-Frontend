
import axios from "axios";

export const getAllGamesApi = async () => {
    const response = await axios.get(`/api/games/getAllGames`, {withCredentials: true});
    return response.data;
}

export const getGameByIdApi = async (gameId) => {
    const response = await axios.get(`/api/games/getBySecondId/${gameId}`, {withCredentials: true});
    return response.data;
}

export const getGameCategoriesApi = async (gameId) => {
    const response = await axios.get(`/api/games/getCategoriesByGameId/${gameId}`, {withCredentials: true});
    return response.data;
}

export const getAllGamesByPageApi = async (requestData) => {
    const response = await axios.post(`/games/getAllGamesByPage`, requestData, {withCredentials: true});
    return response.data.games;
}

export const addGameApi = async (requestData) => {
    const response = await axios.post(`/games/addNewGame`, requestData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });
    return response.data;
}
