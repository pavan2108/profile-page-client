import axios from "axios";
import { API_BASE_URL } from "../constants";
import { Hackathon } from "../interfaces/hackathon.interface";

const createHackathon = async (username: string, data: Hackathon) => {
    const response = await axios.post(`${API_BASE_URL}/profiles/${username}/hackathons`, data);
    return response.data;
};

const editHackathon = async (username: string, hackathonId: string, data: Hackathon) => {
    const response = await axios.put(`${API_BASE_URL}/profiles/${username}/hackathons/${hackathonId}`, data);
    return response.data;
};

const deleteHackathon = async (username: string, hackathonId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/profiles/${username}/hackathons/${hackathonId}`);
    return response.data;
};


export {
    createHackathon,
    editHackathon,
    deleteHackathon
}