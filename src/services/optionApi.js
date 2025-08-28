import api from "src/services/api.js";

export const getOptions = async (offerId) => {
    const response = await api.get(`/public/offers/${offerId}/options`);
    return response.data;
};

export const getOfferData = async (offerId) => {
    const response = await api.get(`/public/offers/${offerId}`);
    return response.data;
};