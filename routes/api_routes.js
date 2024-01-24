const router = require("express").Router();
const { v4 } = require('uuid');

const { getUserData, saveUserData } = require("../db/connection");

const db = require("../db/connection");

// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // make a query to the db and get al rows from the users table

    try {
        const [users] = await db.query("SELECT * FROM users");

        responseObj.json(users);

        // check if the users exist
        const [results] = await db.query("SELECT * FROM users WHERE id = ?", [userData.username]);

        // check if a user was found matching that username
        if (results.length) {
            return responseObj.json({
                error: 402,
                message: "that user already exists"
            })
        }

        // run a quesry to INSERT a new user into the user table, with our requestObj.body.data (username, email, password)
        const [result] = await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [userData.username, userData.email, userData.password]);

        responseObj.json({
            message: "User added successfully",
            inserId: results.insertId
        });

    } catch (err) {
        console.log(err);
    }

    // db.query("SELECT * FROM users", (err, users) => {
    //     if (err) return console.log(err);

    //     responseObj.json(users);
    // })


    // // Read the json file data
    // const users = await getUserData();

    // responseObj.send(users);
});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    // const users = await getUserData();
    const userData = requestObj.body;


    // // Overwrite the old array with the newly updated array
    // if (!users.find(user => user.username === userData.username) && userData.username) {
    //     // Push the body object from the client to our old array

    //     userData.id = v4();

    //     users.push(userData);

    //     await saveUserData(users);

    //     return responseObj.send({
    //         message: 'User added successfully!'
    //     });
    // }

    // responseObj.send({
    //     error: 402,
    //     message: 'User already exists'
    // });

});

// GET Route to return a user by id
router.get("/users/:id", async (requestObj, responseObj) => {
    try {
        // Get the user ID from the request parameters
        const user_id = requestObj.params.id;

        // Use SQL to select the user with the specified ID from the database
        const [results] = await db.query("SELECT * FROM users WHERE id = ?", [user_id]);

        // Check if the query returned any results
        if (results.length) {
            // If results exist, send the first result as JSON
            responseObj.json(results[0]);
        } else {
            // If no results, send a 404 response with an error message
            responseObj.status(404).send({
                error: 404,
                message: "No User With That id"
            });
        }
    } catch (error) {
        // Catch and handle any errors that occurred during the asynchronous database operation
        console.error(error);
        responseObj.status(500).send({
            error: 500,
            message: "Internal Server Error"
        });
    }
});


// Delete route to remove user from the database
router.delete("/user/:id", async (requestObj, responseObj) => {
    try {
        // Get the user ID from the request parameters
        const user_id = requestObj.params.id;

        // Use SQL to delete the user with the specified ID from the database
        const deleteQuery = "DELETE FROM users WHERE id = ?";
        await db.query(deleteQuery, [user_id]);

        responseObj.send({
            message: "User deleted successfully"
        });
    } catch (error) {
        // Catch and handle any errors that occurred during the asynchronous database operation
        console.error(error);
        responseObj.status(500).send({
            error: 500,
            message: "Internal Server Error"
        });
    }
});


module.exports = router;