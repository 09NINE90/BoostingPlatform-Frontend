import api from "src/services/api.js";

/**
 * API для заказчика
 */

export const postCreateOrders = async (request) => {
    const response = await api.post(`/order/customer/create`, request);
    return response.data;
}

export const getOrdersByCreator = async (request) => {
    const response = await api.post(`/order/customer/my-orders`, request);
    return response.data;
}

export const getCustomerOrderById = async (orderId) => {
    const response = await api.get(`/order/customer/${orderId}`);
    return response.data;
}

/**
 * API для бустера
 */

export const getFiltersDashboard = async () => {
    const response = await api.get(`/order/booster/dashboard/filters`);
    return response.data;
}

export const getDashboardOrders = async (request) => {
    const response = await api.post(`/order/booster/dashboard`, request);
    return response.data;
}

export const getFiltersForOrdersByBooster = async () => {
    const response = await api.get(`/order/booster/my-orders/filters`);
    return response.data;
}

export const getOrdersByBooster = async (request) => {
    const response = await api.post(`/order/booster/my-orders`, request);
    return response.data;
}

export const getBoosterOrdersHistory = async () => {
    const response = await api.get(`/order/booster/history`);
    return response.data;
}

export const acceptOrder = async (orderId) => {
    const response = await api.post(`/order/booster/accept/${orderId}`);
    return response.data;
}

export const completeExecutionOrder = async (orderId) => {
    const response = await api.post(`/order/booster/complete/${orderId}`);
    return response.data;
}

export const getBoosterOrderById = async (orderId) => {
    const response = await api.get(`/order/booster/${orderId}`);
    return response.data;
}
