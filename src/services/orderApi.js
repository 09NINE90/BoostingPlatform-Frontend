import axios from "axios";

export const getOffersFilters = async () => {
    const response = await axios.get(`/api/order/getFilters`, {withCredentials: true});
    return response.data;
}

export const getOrderStatuses = async () => {
    const response = await axios.get(`/api/order/getOrderStatuses`, {withCredentials: true});
    return response.data;
}

export const getOffersByCreator = async (request) => {
    const response = await axios.post(`/api/order/getByCreator`, request, {withCredentials: true});
    return response.data;
}