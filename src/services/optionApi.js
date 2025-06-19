import api from "src/services/api.js";

export const getOptions = async (offerId) => {
    const response = await api.get(`/offer/public/option/byOfferId/${offerId}`);
    return response.data;
};

export const getOfferData = async (offerId) => {
    const response = await api.get(`/offer/public/${offerId}`);
    return response.data;
};