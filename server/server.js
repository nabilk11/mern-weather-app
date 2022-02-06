require('dotenv').config();
// Require Express
const express = require('express');
// Require Mongoose
const mongoose = require('mongoose');
// Require body-parser
const bodyParser = require('body-parser');

// express app
const app = express();
//PORT in ENV file
const PORT = process.env.PORT || 5000;

// Body Parser to parse data for Post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const Weather = require("./api/weather")
//API Routes 
const apis = require('./api');
app.use("api", apis);
app.use("/weather", apis)


// home route temp
app.get("/", apis);
//MONGDB Conection
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}). then(() => {
    console.log('MERN Weather is now Connected to the Database')
}).catch(err => console.log(err))
// Server Listener
app.listen(PORT, () => {
    console.log(`We are now connected to Port:${PORT}`)
});
