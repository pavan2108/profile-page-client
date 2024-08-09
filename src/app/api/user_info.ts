
import axios from "axios";
import { UserInfo } from "../interfaces/user_info.interface";
import { API_BASE_URL } from "../constants";

const updateUserInfo = async (username: string, data: UserInfo) => {
    const response = await axios.post(`${API_BASE_URL}/profiles/${username}/socials`, data);
    return response.data
}

export {
    updateUserInfo
}