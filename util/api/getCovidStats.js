const axios = require("axios");
const { API_COVID_API_KEY } = require("../config")
const BASE_URL = `https://worldometer-covid-19.p.rapidapi.com/GetCovidStats`;

module.exports = async (params) => {
    const options = {
        method: 'GET',
        url: 'https://worldometer-covid-19.p.rapidapi.com/GetCovidStats',
        params: params,
        headers: {
          'X-RapidAPI-Key': API_COVID_API_KEY,
          'X-RapidAPI-Host': 'worldometer-covid-19.p.rapidapi.com'
        }
      }
    try {
        return axios.get(BASE_URL, options)
    } catch (e) {
        console.log(e)
    }
};