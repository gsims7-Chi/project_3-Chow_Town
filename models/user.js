const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
    admin: {
    type: Boolean,
    default: false,
  },
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number,
  email: String
});



module.exports = mongoose.model('User', UserSchema);