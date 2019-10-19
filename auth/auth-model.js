const db = require('../database/dbConfig'); 

// exporting models
module.exports = {
    addUser,
    findUser
}

function addUser(user){
    return db('users').insert(user); 
}

function findUser(username){
    console.log(username); 
    return db('users').where(username); 
}