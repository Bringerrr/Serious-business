const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get All users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.post('/', (req, res) => {
  const newUser = new User({
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  newUser.save().then(user => res.json(user));
});

// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   EXIST api/users/:email
// @desc    exist A User
// @access  Public
router.post('/auth/:email', (req, res) => {
  User.findOne({email:req.params.email})
  .then(user => {
    if (user) {
      res.send(true)
    } else {
        res.send(false)
    }
  })
});


module.exports = router;
