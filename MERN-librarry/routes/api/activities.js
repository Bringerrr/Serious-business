const express = require('express');
const router = express.Router();

// Activity Model
const Activity = require('../../models/Activity');

// @route   GET api/activities
// @desc    Get All Activitys
// @access  Public
router.get('/', (req, res) => {
  Activity.find()
    .sort({ date: -1 })
    .then(activities => res.json(activities));
});

// @route   POST api/activities
// @desc    Create An Activity
// @access  Public
router.post('/', (req, res) => {
  const {id, user, rating, review} = req.body
  const newActivity = new Activity({
    imdbID: req.body,
    userRating: req.body.rating,
    userReview: req.body.review
  });

  newActivity.save().then(activity => res.json(activity));
});

// @route   DELETE api/activities/:id
// @desc    Delete A Activity
// @access  Public
router.delete('/:id', (req, res) => {
  Activity.findById(req.params.id)
    .then(activity => activity.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
