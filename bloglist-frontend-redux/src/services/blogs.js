import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

const create = async (blog) => {
    const config = {headers: {Authorization: token}}
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateLikes = async (id, updatedBlog) => {
    const config = {headers: {Authorization: token}}
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {headers: {Authorization: token}}
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const addComment = async (id, comment) => {
    console.log('comment addComment axios request', comment)
    console.log('comment addComment axios request', typeof comment)
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
    return response.data;
};

export default {getAll, setToken, create, updateLikes, deleteBlog, addComment}