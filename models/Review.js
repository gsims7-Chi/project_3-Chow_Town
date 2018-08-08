const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
	review: String,
	rating: Number,
	username: String,
	entityId: Number
})



module.exports = mongoose.model('Review', reviewSchema);
