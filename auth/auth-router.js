const router = require('express').Router();
const authinticate = require('./authenticate-middleware');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

//model
const Users = require('./auth-model');

const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  // implement registration
  const body = req.body;
  const hash = bcrypt.hashSync(body.password, 12); 
  body.password = hash;
  Users.addUser(body)
  .then(user => {
    res.status(201).json(user); 
  })
  .catch(err => {
    res.status(500).json(err); 
  })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body; 
  console.log(username) ;
  Users.findUser({ username })
    .first()
    .then(user => {
      console.log(user); 
      const token = generateToken(user); 
      res.status(201).json({ message: `Welcome back, ${user.username}!`, token}); 
    })
    .catch(err => {
      res.status(500).json(`${err}`);  
    })
});

//generate JWT for frontend auth
function generateToken(user) {
  console.log(user.id); 
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options); 
}

module.exports = router;
