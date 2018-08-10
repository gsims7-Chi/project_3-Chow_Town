const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 9000;


require('./db/db')

// middle ware

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

// Set up cors middleware so any client can make a request to the server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const corsOptions = {
  origin: 'https://chow-town.herokuapp.com/', //specify what site can use our API
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// allow other servers to talk to our server
app.use(cors(corsOptions));

// require the controller after the middleware
const reviewController = require('./controllers/reviewController')
const searchController = require('./controllers/searchController');
const authController = require('./controllers/authController');
app.use('/review', reviewController)
app.use('/search', searchController)
app.use('/auth', authController);


app.listen(PORT, () => {
	console.log("I'm listening on port 9000")
})
