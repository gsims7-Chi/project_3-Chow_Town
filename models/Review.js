const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
	review: String,
	rating: Number,
	username: String,
	resId: Number
}) 



module.exports = mongoose.model('Review', reviewSchema);