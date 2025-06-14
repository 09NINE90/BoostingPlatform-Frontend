import axios from "axios";

export const getOrderFilters = async () => {
    const response = await axios.get(`/api/order/getFilters`, {withCredentials: true});
    return response.data;
}

export const getOrdersByCreator = async (request) => {
    const response = await axios.post(`/api/order/getByCreator`, request, {withCredentials: true});
    return response.data;
}

export const getAllOrder = async (request) => {
    const response = await axios.post(`/api/order/getAll`, request, {withCredentials: true});
    return response.data;
}

export const getOrderById = async (orderId) => {
    const response = await axios.get(`/api/order/${orderId}`, {withCredentials: true});
    return response.data;
}

export const acceptOrder = async (orderId) => {
    const response = await axios.post(`/api/order/accept/${orderId}`, {withCredentials: true});
    return response.data;
}