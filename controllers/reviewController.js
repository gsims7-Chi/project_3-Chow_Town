const express = require('express');
const router = express.Router();
const Review = require('../models/review.js');
const User = require('../models/user.js')

router.get('/', async (req, res) => {
	try {
		const theUser = await User.find({'username': req.session.username});
		// const foundResturantId = await 

		// const theReview = await Review.find({'resId': })
	} catch(err) {
		console.log(err, 'this is an error in the  review ccontroller')
		res.json(err)
	}
})



module.exports = router;