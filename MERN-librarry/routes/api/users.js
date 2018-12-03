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

  newUser.save()
  .then(user => res.json(user))
  .catch(err => res.json(err));
});


// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   AUTH api/users/auth/:email/:password
// @desc    user's auth
// @access  Public
router.post('/auth/:email/:password', (req, res) => {
  User.findOne({email:req.params.email,password:req.params.password})
  .then(user => res.json(user))
  .catch(err => res.json(err));
    }
);

// @route   PATCH api/users/:id
// @desc    update user's info
// @access  Public

// router.patch('/:id', (req, res) => {
//   User.findByIdAndUpdate(
//     // the id of the item to find
//     req.params.id,
    
//     // the change to be made. Mongoose will smartly combine your existing 
//     // document with this change, which allows for partial updates too
//     req.body,
    
//     // an option that asks mongoose to return the updated version 
//     // of the document instead of the pre-updated one.
//     {new: true},
    
//     // the callback function
//     (err, todo) => {
//     // Handle any possible database errors
//         if (err) return res.status(500).send(err);
//         return res.send(todo);
//         }
//     )
//   } 
// );

// @route   PATCH api/users/:id
// @desc    add user's film_storage
// @access  Public
router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {$push: {film_storage: req.body}},
    {safe: true, upsert: true},
    (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.send(todo);
        }
    )
  } 
);


module.exports = router;
