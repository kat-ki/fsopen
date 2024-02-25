import axios from "axios";

const baseURL = '/api/persons'

const getAllPersons = () => {
    return axios.get(baseURL)
        .then(response => response.data)
}

const createPerson = (newPerson) => {
    return axios.post(baseURL, newPerson)
        .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseURL}/${id}`, updatedPerson)
        .then(response => response.data)
}


export default {
    getAllPersons,
    createPerson,
    deletePerson,
    updatePerson
}