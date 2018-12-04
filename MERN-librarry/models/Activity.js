const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserActivity = new Schema({
  imdbID: {
    type: String,
    required: false
  },
  
  userRating: [{
      rating: {type:Number, min: 0, max: 10},
      user:   {type:String}
  }],

  userReview: [{
    review:   {type:String},
    user:     {type:String}
  }]

});


module.exports = Activity = mongoose.model('item', UserActivity);
