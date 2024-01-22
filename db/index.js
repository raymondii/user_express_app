const express = require('express');
const path = require('path');
const fs = require('fs');
const DB_PATH = path.join(__dirname, "./data.json");


async function getUserData() {
    const users = await fs.promises.readFile(DB_PATH, 'utf8');
  
    return JSON.parse(users);
  }
  
  async function saveUserData(usersArr) {
    await fs.promises.writeFile(DB_PATH, JSON.stringify(usersArr, null, 2));
  
    console.log('User Data Updated');
  }

  module.exports = {
    getUserData: getUserData,
    saveUserData: saveUserData
  }