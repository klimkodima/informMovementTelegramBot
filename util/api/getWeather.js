const axios = require('axios');
const { WEATHER_API_KEY, } = require('../config')
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=53.900002&lon=27.566668&units=metric&appid=${WEATHER_API_KEY}&lang=ru`;

module.exports = async () => {
    try {
        return axios.get(BASE_URL)
    } catch (e) {
        console.log(e);
    }
};