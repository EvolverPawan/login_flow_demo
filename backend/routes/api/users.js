const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
// Load input validation
const validateLoginInput = require('../../validation/login')
// Load User model
const User = require('../../models/Users')

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const username = req.body.username
  const password = req.body.password
  // Check if user exists
  let user = User.users.find(x => x.username === username)
  if (!user) {
    return res.status(404).json({ emailnotfound: 'username not found' })
  }
  // Check password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = {
        fname: user.fname,
        lname: user.lname,
        username: user.username
      }
      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          if (err) {

          }
          console.log('err', err)
          res.json({
            success: true,
            user: payload,
            token: 'Bearer ' + token
          })
        }
      )
    } else {
      return res
        .status(400)
        .json({ passwordincorrect: 'Password incorrect' })
    }
  })
})

module.exports = router
