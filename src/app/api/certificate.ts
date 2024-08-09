import axios from "axios";
import { API_BASE_URL } from "../constants";
import { Certification } from "../interfaces/cerfication.interface";

const createCertification = async (username: string, data: Certification) => {
    const response = await axios.post(`${API_BASE_URL}/profiles/${username}/certifications`, data);
    return response.data;
};

const editCertification = async (username: string, certificationId: string, data: Certification) => {
    const response = await axios.put(`${API_BASE_URL}/profiles/${username}/certifications/${certificationId}`, data);
    return response.data;
};

const deleteCertification = async (username: string, certificationId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/profiles/${username}/certifications/${certificationId}`);
    return response.data;
};

export {
    createCertification,
    editCertification,
    deleteCertification
}