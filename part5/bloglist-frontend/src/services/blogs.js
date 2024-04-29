import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (blog) => {
    const config = {headers: {Authorization: token}}
    const response = await axios.post(baseUrl, blog, config)
    return response.data;
}

const updateLikes = async (id, updatedBlog) => {
    const config = {headers: {Authorization: token}}
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
    return response.data;
}

export default {getAll, setToken, create, updateLikes}