import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/';

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const apiKey = import.meta.env.VITE_API_KEY_WEATHER;

const getCountries = () => {
    return axios.get(`${baseURL}/api/all`)
        .then(response => response.data)
}

const getWeather = (capital) => {
    return axios.get(`${weatherURL}${capital}&appid=${apiKey}`)
        .then(response => {
            response.data
            const weatherIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
            return {...response.data, weatherIcon}
        })
}


export default {
    getCountries,
    getWeather
}