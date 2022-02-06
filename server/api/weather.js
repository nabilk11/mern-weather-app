//axios import
const axios = require('axios');

// .env file confuguration path
require('dotenv').config({
    path: "../../.env",
});

// Weather API Url
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

// Weather Class
class Weather {
    getWeatherData = async (zipCode, tempMetric) => {

        let url = `${baseUrl}?zip=${zipCode},us&appid=${process.env.WEATHER_KEY}&units=${tempMetric}`;
        return (await axios(url)).data;
    }
}

// export the class of Weather
module.exports = Weather;
