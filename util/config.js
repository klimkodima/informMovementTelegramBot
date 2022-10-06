require('dotenv').config()

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const API_LAYER_API_KEY = process.env.API_LAYER_API_KEY
const PIXABAY_KEY = process.env.PIXABAY_KEY
const API_COVID_API_KEY = process.env.API_COVID_API_KEY

module.exports = {
    TELEGRAM_API_TOKEN,
    WEATHER_API_KEY,
    API_LAYER_API_KEY,
    PIXABAY_KEY,
    API_COVID_API_KEY
}