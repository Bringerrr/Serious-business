const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  imdbID: {
    type: String,
    required: false
  },
    review: {
        type:String,
        required: false
    },
    user:   {
        type:String,
        required: false
    },
    title:  {
        type:String,
        required: false
    },
    year:  {
        type:Number,
        required: false
    },
    poster: {
        type: String,
        required: false
    },
    date: {
        type:Date,
        default: Date.now
    }

});


module.exports = Review = mongoose.model('review', ReviewSchema);