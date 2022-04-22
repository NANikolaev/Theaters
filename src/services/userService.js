const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcrypt');

function register(req, res) {
  let body = req.body
  if (body.password != body.repeatPassword) {
    throw new Error('Password Missmatch.')
  }
  return User.create({
    username: body.username,
    password: body.password,
  })
    .then(user => {
      let payload = {
        username: user.username,
        id: user._id
      }
      let token = jwt.sign(payload, secret)
      return token
    })
}

function logIn(req, res) {
  if (req.body.username == '' || req.body.password == '') {
    throw new Error('Missed field/s.')
  }

  return User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) { throw new Error("Invalid Username") }

      let isValidPass = bcrypt.compareSync(req.body.password, user.password)
      if (!isValidPass) { throw new Error("Invalid Password") }

      let payload = {
        username: user.username,
        id: user._id
      }
      let token = jwt.sign(payload, secret, { expiresIn: '1d' })
      return token

    })
    .catch(err => { throw new Error(err.message) })

}

module.exports = { register, logIn }