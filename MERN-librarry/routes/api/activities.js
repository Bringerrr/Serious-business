const express = require('express');
const router = express.Router();

// Activity Model
const Activity = require('../../models/Activity');

// @route   GET api/activities
// @desc    Get All reviews
// @access  Public
router.get('/', (req, res) => {
  Activity.find()
    .sort({ date: -1 })
    .then(activities => res.json(activities));
});

// @route   POST api/activities
// @desc    POST review
// @access  Public
router.post('/', (req, res) => {
  console.log(req.body)
  const newActivity = new Activity({
    imdbID: req.body.id,
    userReview: [{review:req.body.review,user:req.body.user}]
  });
  newActivity.save().then(activity => res.json(activity));
});

// @route   DELETE api/activities/:id
// @desc    Delete A review
// @access  Public
router.delete('/reviews:id', (req, res) => {
  Activity.findById(req.params.id)
    .then(activity => activity.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
