
// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path= require("path");

// server port
const port = 4020; 
// Start up an instance of app
const app = express();
// this is the default for access anyone from any localhost also you can use allowedheaders?
app.use(cors());
/* Dependencies */
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static(path.join(__dirname, '..', 'website')));
// Spin up the server
app.listen(port,() => {
 console.log(`Server is running on: http://localhost:${port}`);
})

// Callback to debug
// Callback function to complete GET '/all'

// Post Route
const data = [];
app.post('/addData', (req, res)=>{
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
});

// Initialize all route with a callback function
app.get('/allData', (req, res)=>{
    // console.log("get data are here")
    console.log(projectData);
    // these are all status codes https://developer.mozilla.org/en-US/docs/Web/HTTP/Status so 200 means success
    res.send(projectData).status(200).end();
    // end is optional
});

