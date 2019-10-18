/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const secrets = require('../config/secrets'); 
const Users = require('./auth-model');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, "keep it secret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass!' });
      }
      else {
        req.user = { username: decodedToken.username }
        next()
      }
    })
  }
  else {
    res.status(400).json({ message: "no credentials provided" })
  }
};
