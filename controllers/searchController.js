const express = require('express');
const router = express.Router();
const superagent = require('superagent')
// const Search = require('../models/Search');


//SEARCH ROUTE -- get or post?
	// figure out how to get search params?  query string? or req.body?

	// api call to zomato: get location id
	// api call to zomato: see if you can get restaurants from zomato search using the location ID

	// send a json response 

// finds resturaunts

router.post('/', async (req, res) => {
	try {
		const City = req.body.city
		const foundCity = await superagent('https://developers.zomato.com/api/v2.1/locations?query=' + City)
		.set('user-key', '75694589a46d1003747fa22c350d5e2c')
		console.log('-------------------RESPONSE----------------------')
		console.log('-------------------RESPONSE----------------------')

		console.log(foundCity.body.location_suggestions[0].entity_type)

		console.log('-------------------RESPONSE----------------------')
		console.log('-------------------RESPONSE----------------------')
		console.log(foundCity.body.location_suggestions[0].entity_id)
		

		const entityId = foundCity.body.location_suggestions[0].entity_id


		const entityType = foundCity.body.location_suggestions[0].entity_type
		
		const foundSearch = await superagent(`https://developers.zomato.com/api/v2.1/search?entity_id=${entityId}&entity_type=${entityType}`)
		.set('user-key', '75694589a46d1003747fa22c350d5e2c')
		console.log('--------------Search---------------')
		console.log(foundSearch.body, 'this is foundSearch')
		
		// TODO: write code figure out of any of the results have reviews
		// --->look thru reviews in db and see if any of them have a restaurant id that matches any
		// of the IDs in foundSearch
		// you may need to construct the response by filtering or manually adding restaurants to an o
		// object in a loop

		res.json(foundSearch.body)

	} catch(err) {
		console.log(err, ' this is an error in searchController that is trying to fine routes')
		res.send('it didnt work')
	}
})

// show route for a particular restaurant
	// get restaurant data from zomato using zid --- ajax call
	// get reivews for this resaurant from database -- mongoose query
	// build a JSON response including both of these things






module.exports = router;