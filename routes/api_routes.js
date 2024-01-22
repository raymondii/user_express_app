const router = require("express").Router();
const { v4 } = require('uuid');

const { getUserData, saveUserData } = require("../db/index.js");

// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // Read the json file data
    const users = await getUserData();

    responseObj.send(users);
});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    const users = await getUserData();
    const userData = requestObj.body;

    // Overwrite the old array with the newly updated array
    if (!users.find(user => user.username === userData.username) && userData.username) {
        // Push the body object from the client to our old array

        userData.id = v4();

        users.push(userData);

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

//GET Route to return a user by id
router.get("/users/:id", async (requestObj, responseObj) => {
    console.log(requestObj.params)
    const user_id = requestObj.params.id

    const users = await getUserData();

    const user = users.find(user => user.id === user_id)

    if (user) {
        return responseObj.send(user);
    }

    responseObj.send({
        error: 404,
        message: "No User With That id"
    })

});

// delete route to remove user from the database
router.delete("/user/:id", async (requestObj, responseObj) => {
    //get the user data
    const users = await getUserData();
    const user_id = requestObj.param.id

    // find the user in the users array matching the param id
    const user = users.find(usrObj => usrObj.id === user_id);

    // get the index of the user
    const index = users.indexOf(user);

    // splice the users array, starting at the index of the user objec matching the id from our parameter
    // users.splice(index, 1);

    // filter out the user object matching our param id from the users array
    const filtered = users.filter(usrObj => usrObj.id !== user_id);

    // overwite the old array with the updated array // missing tge user object
    await saveUserData(users);

    responseObj.send({
        message: "User deleted successfully"
    })
});

module.exports = router;