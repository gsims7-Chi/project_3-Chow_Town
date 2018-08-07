const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({
	review: String,
	rating: Number,
	username: String,
	resId: Number
}) 



module.exports = mongoose.model('Review', reviewsSchema);