import axios from "axios";

const baseUrl = "/api/users"
const fetchUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

const fetchUserById = async (userId) => {
    const response = await axios.get(`${baseUrl}/${userId}`);
    return response.data;
}


export default {fetchUsers, fetchUserById}