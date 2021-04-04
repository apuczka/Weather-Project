// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const express = require('express');

// Start up an instance of app
const app = express();
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8888;
const server = app.listen(port, listening);
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//get requests
app.get('/all', function(req, res) {
    res.send(projectData)
    console.log(projectData)
})

// post request
app.post('/add', function(req, res) {
    if (req.body) {
        projectData = req.body
        console.log(projectData)

    }
    res.send({status: 'ok'});

    newEntry = {
        temperature: req.body.temp,
        date: req.body.date,
        response: req.body.resp
    }
    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)
})
