import api from "src/services/api.js";

export const getFiltersForCreatedOrders = async () => {
    const response = await api.get(`/order/getFiltersForCreatedOrders`);
    return response.data;
}

export const getFiltersForOrdersByBooster = async () => {
    const response = await api.get(`/order/getFiltersForOrdersByBooster`);
    return response.data;
}

export const getOrdersByCreator = async (request) => {
    const response = await api.post(`/order/getByCreator`, request);
    return response.data;
}

export const getAllOrders = async (request) => {
    const response = await api.post(`/order/getAll`, request);
    return response.data;
}

export const getOrdersByBooster = async (request) => {
    const response = await api.post(`/order/byBooster`, request);
    return response.data;
}

export const acceptOrder = async (orderId) => {
    const response = await api.post(`/order/accept/${orderId}`);
    return response.data;
}