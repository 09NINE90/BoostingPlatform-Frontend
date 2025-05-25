
import axios from "axios";

export const getAllServicesApi = async (requestData) => {
    const response = await axios.post(`/services/getAllServices`, requestData, {withCredentials: true});
    return response.data.services;
}

export const addServiceApi = async (requestData) => {
    const response = await axios.post(`/services/addNewService`, requestData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });

    return response.status;
}