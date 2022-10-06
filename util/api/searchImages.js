const axios = require('axios');
const { PIXABAY_KEY } = require('../config')
const BASE_URL = `https://pixabay.com/api/`

module.exports = async (q) => {
    try {
        return axios.get(BASE_URL, {
            params: {
                key: PIXABAY_KEY,
                q
            },
        });
    } catch (e) {
        console.log(e);
    }
}
