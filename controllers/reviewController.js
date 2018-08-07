const express = require('express');
const router = express.Router();
const Review = require('../models/review.js');
const User = require('../models/user.js')

// create -- 
router.post('/', async (req, res) => {
	try{
		// add data in req.body to database (using mongoose)
		const newReview = await Review.create(req.body)
		res.json(newReview)
	}catch(err){
		console.log(err, 'this an error in the create route')

	}
})

// index
router.get('/', async (req, res) => {
	try {
		const findReview = await Review.find({'resId': restaurant.res_id})
		// const foundResturantId = await 

		// const theReview = await Review.find({'resId': })
		// send back json
	} catch(err) {
		console.log(err, 'this is an error in the  review ccontroller')
		res.json(err)
	}
})

// show



// update



// destroy

module.exports = router;