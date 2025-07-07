import api from "src/services/api.js";

export const getOffersByGameId = async (gameId) => {
    if (gameId !== 'undefined') {
        const response = await api.get(`/offer/public/getOffersByGameId/${gameId}`);
        return response.data;
    }
}

export const deleteCartItem = async (itemId) => {
    const response = await api.post(`/offer/deleteCartItem/${itemId}`);
    return response.data;
}

export const getOffersByRequest = async (request) => {
    const response = await api.post(`/offer/public/getOffersByRequest`, request);
    return response.data;
}

export const postOffersToCart = async (cartItem) => {
    const response = await api.post(`/offer/addToCart`, cartItem);
    return response.data;
}

export const getCarouselItemsApi = async () => {
    const response = await api.get(`/carousel/getItems`);
    return response.data;
}

export const getCartItemsApi = async () => {
    const response = await api.get(`/offer/getCartItems`);
    return response.data;
}

export const getCountCartItemsApi = async () => {
    const response = await api.get(`/offer/getCountCartItems`);
    return response.data;
}
