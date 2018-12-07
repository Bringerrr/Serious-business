const express = require('express');
const router = express.Router();

// Review Model
const Review = require('../../models/Review');

// @route   GET api/reviews
// @desc    Get All Reviews
// @access  Public
router.get('/', (req, res) => {
  Review.find()
    .sort({ date: -1 })
    .then(reviews => res.json(reviews));
});

// @route   POST api/reviews
// @desc    Create a reviews
// @access  Public
router.post('/', (req, res) => {
  const newReview = new Review({
    imdbID: req.body.imdbID,
    review: req.body.review,
    user: req.body.user,
    title: req.body.title,
    year: req.body.year,
    poster: req.body.poster
  });

  newReview.save().then(review => res.json(review));
});



module.exports = router;
