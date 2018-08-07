const express    = require('express');
const app        = express();
const router     = express.Router();
const bodyParser = require('body-parser');
const cors       = require('cors');
const session    = require('express-session');
require('./db/db');

// middle ware

app.use(session({
  secret: 'munin',
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// controllers
const searchController = require('./Controllers/search');

app.use('/search', searchController)



app.listen(9000, () => {
	console.log("I'm listening on port 9000")
})