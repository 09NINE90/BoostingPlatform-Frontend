import api from "src/services/api.js";

export const postHandleWithdrawal = async (request) => {
    const response = await api.post(`/finance/handleWithdrawal`, request);
    return response.data;
}
