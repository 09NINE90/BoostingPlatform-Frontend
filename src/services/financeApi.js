import api from "src/services/api.js";

export const postHandleWithdrawal = async (request) => {
    const response = await api.post(`/boosters/finance/withdrawals`, request);
    return response.data;
}

export const postHandleSendTip = async (request) => {
    const response = await api.post(`/boosters/finance/tips`, request);
    return response.data;
}

export const getBalanceHistory = async () => {
    const response = await api.get(`/boosters/finance/balance/history`);
    return response.data;
}

export const getOrderTipHistory = async (orderId) => {
    const response = await api.get(`/boosters/finance/orders/${orderId}/tips`);
    return response.data;
}

