import axios from "axios";

export const getOptions = async (offerId) => {
    const response = await axios.get(`/api/offer/option/byOfferId/${offerId}`, {
        withCredentials: true
    });
    return response.data;
};

export const getOfferData = async (offerId) => {
    const response = await axios.get(`/api/offer/${offerId}`, {
        withCredentials: true
    });
    return response.data;
};