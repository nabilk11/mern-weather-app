require('dotenv').config();
// Require Express
const express = require('express');
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

//API Routes 
const apis = require('./api');
app.use("api", apis);

// Server Listener
app.listen(PORT, () => {
    console.log(`We are now connected to Port:${PORT}`)
});
