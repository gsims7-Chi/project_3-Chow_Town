const express        = require('express');
const app            = express();
// const router     = express.Router(); //i dont think we need this line here --> note from jared<--
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session');
const methodOverride = require('method-override');

require('./db/db');

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
  origin: 'http://localhost:3000', //specify what site can use our API
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// allow other servers to talk to our server
app.use(cors(corsOptions));

// require the controller after the middleware
const authController = require('./controllers/authController');
app.use('/auth', authController);


app.listen(9000, () => {
	console.log("I'm listening on port 9000")
})