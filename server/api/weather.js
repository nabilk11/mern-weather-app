//axios import
const axios = require('axios');

// .env file confuguration path
require('dotenv').config()

// Weather API Url
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";


// REQUIRE Weather Model
const WEATHER = require("../models/Weather");

// Weather Class
class Weather {

// saving weather info to db
saveWeatherDataDb = async (zipCode, data) => {
    const filter = {
        zip: zipCode,
    }
    const replace = {
        ...filter,
        ...data,
        data: Date.now()
    }
    await this.findOneReplace(filter, replace)
}
// getting weather data based on zipcode
getWeatherDataDb = async (zipCode) => {
    return WEATHER.findOne( {zip: zipCode})
}

async findOneReplace(filter, replace) {
    await WEATHER.findOneAndReplace(filter, replace, {new: true, upsert: true})
}

    getWeatherData = async (zipCode, tempMetric) => {

        let url = `${baseUrl}?zip=${zipCode},us&appid=${process.env.WEATHER_KEY}&units=${tempMetric}`;
        return (await axios(url)).data;
    }
}

// export the class of Weather
module.exports = Weather;
