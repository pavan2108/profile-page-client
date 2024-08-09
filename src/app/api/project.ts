import axios from "axios";
import { API_BASE_URL } from "../constants";
import { Project } from "../interfaces/project.interface";

const createProject = async (username: string, data: Project) => {
    const response = await axios.post(`${API_BASE_URL}/profiles/${username}/projects`, data);
    return response.data;
};

const editProject = async (username: string, projectId: string, data: Project) => {
    const response = await axios.put(`${API_BASE_URL}/profiles/${username}/projects/${projectId}`, data);
    return response.data;
};

const deleteProject = async (username: string, projectId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/profiles/${username}/projects/${projectId}`);
    return response.data;
};

export {
    createProject,
    editProject,
    deleteProject
}