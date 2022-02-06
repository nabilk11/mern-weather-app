// Express & Express Router
const express = require('express');
const router = express.Router();

// Weather class will allow us to call weather from API
const Weather = require('./weather');

// GET Request Route - Will let us get weather from the weather api
// this is a static get request where the values are put in already
router.get('/weather', async (req, res, next) => {
    let weather = new Weather();
    //example GET request with get WeatherData
    let weatherData = await weather.getWeatherData(11426, "us");
    //data is returned as a JSON then it will be stringify'd
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(weatherData, null, 4))
});

// POST Request Route - Lets us get the weather based on the request body
router.post('/weather', async (req, res) => {
    const {zipCode, tempMetric} = req.body;
    let weather = new Weather();
    // dyanamic parameters of zipCode and tempMetric
    let weatherData = await weather.getWeatherData(zipCode, tempMetric);

    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(weatherData, null, 4))

});

module.exports = router;



