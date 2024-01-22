const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const PORT = 3333;

const app = express();

const api_routes = require("./routes/api_routes");


// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Share or create a GET route for every file in the public folder
app.use(express.static('./public'));

// Open CORS to all domains
// app.use(cors());

// load routes
app.use("/api", api_routes);



app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});