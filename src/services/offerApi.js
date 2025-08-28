import api from "src/services/api.js";

export const getOffersByGameId = async (gameId) => {
    if (gameId !== 'undefined') {
        const response = await api.get(`/public/offers/games/${gameId}`);
        return response.data;
    }
}

export const getOffersByRequest = async (request) => {
    const response = await api.post(`/public/offers`, request);
    return response.data;
}

export const getCarouselItemsApi = async () => {
    const response = await api.get(`/carousel`);
    return response.data;
}

/**
 * API корзины
 */

export const postOffersToCart = async (cartItem) => {
    const response = await api.post(`/cart/items`, cartItem);
    return response.data;
}

export const getCartItemsApi = async () => {
    const response = await api.get(`/cart/items`);
    return response.data;
}

export const getCountCartItemsApi = async () => {
    const response = await api.get(`/cart/items/count`);
    return response.data;
}

export const deleteCartItem = async (itemId) => {
    const response = await api.post(`/cart/items/${itemId}`);
    return response.data;
}
