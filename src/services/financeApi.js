import api from "src/services/api.js";

export const postHandleWithdrawal = async (request) => {
    const response = await api.post(`/finance/handleWithdrawal`, request);
    return response.data;
}

export const getBalanceHistory = async () => {
    const response = await api.get(`/finance/balanceHistory`);
    return response.data;
}

