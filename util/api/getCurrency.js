const axios = require("axios");
const { API_LAYER_API_KEY } = require('../config')
const BASE_URL = `https://api.apilayer.com/exchangerates_data/latest?base=USD`;

module.exports = async () => {
  try {
    return axios.get(BASE_URL,{
      params: {
        apikey:API_LAYER_API_KEY
      }
    })
  } catch (e) {
    console.log(e);
  }
}
