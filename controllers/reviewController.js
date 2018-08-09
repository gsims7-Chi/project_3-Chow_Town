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
		const findReview = await Review.find({'entityId': req.params.entity_id})
		// const foundResturantId = await

		res.json(findReview)
	} catch(err) {
		console.log(err, 'this is an error in the  review controller')
		res.json(err)
	}
})

// show
router.get('/:id', async (req, res) => {
	try{
		const findReview = await Review.findOne({'entityId': req.params.entity_id})
		res.json(findReview)
	}catch(err){
		console.log(err, ' this is an error in the show route of review')
	}
})


// update
router.put('/:id', async (req, res) => {
	try{
		const updatedReview = await Review.findOneAndUpdate({'entityId': req.params.entity_id}, req.body, {new: true});
		res.json(updatedReview)
	}catch(err){
		console.log(err, ' this is an error in the update route of the review controller');
		res.send(err);
	}

})


// destroy

router.delete('/:id', async (req,res) => {
	try{
			const deletedReview = await Review.findOneAndRemove({'entityId': req.params.entity_id})
			res.json(deletedReview)
		}catch(err){
			console.log(err, ' this is an error at the destroy route in review controller');
		}
})





module.exports = router;
