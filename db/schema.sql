-- called schema bc its the schematics of our data
DROP DATABASE IF EXISTS mysql_first_day_db;

CREATE DATABASE mysql_first_day_db;

USE mysql_first_day_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

-- INSERT INTO users(username, email, password) VALUES
--     ("jd", "jd@test.com", "password123"),
--     ("bob", "bob@test.com", "password123"),
--     ("jane", "jane@test.com", "password123");

-- SELECT * FROM users;