import axios from "axios";

export const getOffersByGameId = async (gameId) => {
    if (gameId !== 'undefined') {
        const response = await axios.get(`/api/offer/getOffersByGameId/${gameId}`, {withCredentials: true});
        return response.data;
    }
}

export const getOffersByRequest = async (request) => {
    const response = await axios.post(`/api/offer/getOffersByRequest`, request, {withCredentials: true});
    return response.data;
}

export const postOffersToCart = async (cartItem) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`/api/offer/addToCart`, cartItem,
        {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    return response.data;
}

export const getCarouselItemsApi = async () => {
    const response = await axios.get(`/api/carousel/getItems`, {withCredentials: true});
    return response.data;
}

export const getCartItemsApi = async () => {
    const response = await axios.get(`/api/offer/getCartItems`, {withCredentials: true});
    return response.data;
}
