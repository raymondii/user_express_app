const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require("cors")

const PORT = 3333;

const app = express();

async function getUserData() {
  const users = await fs.promises.readFile('./data.json', 'utf8');

  return JSON.parse(users);
}

async function saveUserData(usersArr) {
  await fs.promises.writeFile('./data.json', JSON.stringify(usersArr, null, 2));

  console.log('User Data Updated');
}

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Root Route
app.get("/", (requeastObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, "./public/index.html"))
});

// // Add Css
// app.get("/css/style.css", (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, "./css/style.css"))
// })

// Read every file in the public folder and make a route for me
app.use(express.static("./public"))

//open CORS to all domains // cross orgin request sharing
app.use(cors());

// Route to retreive/GET all users from the json database
app.get('/api/users', async (requestObj, responseObj) => {
  // Read the json file data
  const users = await getUserData();

  responseObj.send(users);
});

// Route to add a user to the json database
app.post('/api/users', async (requestObj, responseObj) => {
  // Get the old users array
  const users = await getUserData();

  // Overwrite the old array with the newly updated array
  if (!users.find(user => user.username === requestObj.body.username) && requestObj.body.username) {
    // Push the body object from the client to our old array
    users.push(requestObj.body);

    await saveUserData(users);

    return responseObj.send({
      message: 'User added successfully!'
    });
  }

  responseObj.send({
    error: 402,
    message: 'User already exists'
  });

});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});