import axios from "axios";
import { API_BASE_URL } from "../constants";
import { Experience } from "../interfaces/experience.interface";

// API Utility Functions
const createExperience = async (username: string, data: Experience) => {
    const response = await axios.post(`${API_BASE_URL}/profiles/${username}/experiences`, data);
    return response.data;
};

const editExperience = async (username: string, experienceId: string, data: Experience) => {
    const response = await axios.put(`${API_BASE_URL}/profiles/${username}/experiences/${experienceId}`, data);
    return response.data;
};

const deleteExperience = async (username: string, experienceId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/profiles/${username}/experiences/${experienceId}`);
    return response.data;
};

export {
    createExperience,
    editExperience,
    deleteExperience
}