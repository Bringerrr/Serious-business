const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  film_storage: [{
      imdbID: {
        type:String,
        required: false,
      },
      Year: {
        type:String,
        required: false,
      },
      Title: {
        type:String,
        required: false,
      },
      Poster: {
        type:String,
        required: false,
      },
      Genre: {
        type:String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now
      }
  }],
  date: {
    type: Date,
    default: Date.now
  }

});

UserSchema.plugin(uniqueValidator);

module.exports = Item = mongoose.model('user', UserSchema);
