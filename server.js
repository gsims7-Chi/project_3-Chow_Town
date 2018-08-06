const express    = require('express');
const app        = express();
const router     = express.Router();
const bodyParser = require('body-parser');
const cors       = require('cors');
const session    = require('express-session');


require('./db/db');




app.listen(9000, () => {
	console.log("I'm listening on port 9000")
})