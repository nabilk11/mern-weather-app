// Express & Express Router
const express = require('express');
const router = express.Router();

// Weather class will allow us to call weather from API
const Weather = require('./weather');


// GET Request Route - Will let us get weather from the weather api
// this is a static get request where the values are put in already
router.get("/weather", async (req, res) => {
    
    let weather = new Weather();
    //example GET request with get WeatherData
    let weatherData = await weather.getWeatherData(98052, "us");
    //data is returned as a JSON then it will be stringify'd
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(weatherData, null, 4)) // null - no function transofrming the result & 4 means ad 4 page breaks
});

// POST Request Route - Lets us get the weather based on the request body
router.post("/weather", async (req, res) => {
    
    const {zipCode, tempMetric} = req.body;
    let weather = new Weather();
    // dyanamic parameters of zipCode and tempMetric
    let weatherData = await weather.getWeatherData(zipCode, tempMetric);

    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(weatherData, null, 4))

});

// POST request Route - gets weather from api, saves to the DB, then returns it
router.post("/weatherMONGO", async (req, res) => {
    const {zipCode, tempMetric} = req.body;
    let weather = new Weather();
    let weatherData = await weather.getWeatherData(zipCode, tempMetric)

    await weather.saveWeatherDataDb(zipCode, tempMetric)
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(weatherData, null, 4))
})


// GET Request Route - get saved weather data from DB
router.get("/weatherMONGO", async (req, res) => {
    const {zipCode} = req.query;
    let weather = new Weather();

    let weatherData = await weather.getWeatherDataDb(zipCode)
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(weatherData, null, 4))
})



module.exports = router;



