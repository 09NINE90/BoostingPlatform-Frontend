import api from "src/services/api.js";

export const getFiltersDashboard = async () => {
    const response = await api.get(`/order/getFiltersDashboard`);
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

export const getDashboardOrders = async (request) => {
    const response = await api.post(`/order/getDashboard`, request);
    return response.data;
}

export const getOrdersByBooster = async (request) => {
    const response = await api.post(`/order/byBooster`, request);
    return response.data;
}

export const getBoosterOrdersHistory = async () => {
    const response = await api.get(`/order/boosterOrdersHistory`);
    return response.data;
}

export const acceptOrder = async (orderId) => {
    const response = await api.post(`/order/accept/${orderId}`);
    return response.data;
}

export const completeExecutionOrder = async (orderId) => {
    const response = await api.post(`/order/complete/${orderId}`);
    return response.data;
}

export const getBoosterOrderById = async (orderId) => {
    const response = await api.get(`/order/booster/${orderId}`);
    return response.data;
}

export const getCustomerOrderById = async (orderId) => {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
}