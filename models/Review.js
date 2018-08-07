const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({
	review: String,
	rating: Number,
	username: String
}) 



module.exports = mongoose.model('Review', reviewsSchema);