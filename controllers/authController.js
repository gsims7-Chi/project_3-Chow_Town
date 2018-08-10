const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt  = require('bcrypt');
router.use((req, res, next) => {
  console.log("")
  console.log("heyyyyyyyyyyyy");
  console.log("")
  next()
})

// login form
router.get('/login', async (req, res) => {
  // login page with message if there was one
  // if req.session message has value
  try {
    if(req.session.message) {
      const message = req.session.message
      // removes message so not displayed again
      req.session.message = null
  
      res.json({
        status: 200,
        data: 'login unsuccessful',
        message: message, 
        loggedIn: req.session.loggedIn
      });
    } else {
      res.json({
        status: 200,
        data: 'login successful',
        message: null, 
        loggedIn: req.session.loggedIn
      });
    }
  } catch (err){
    console.log(err)
    res.send(err)
  }
});

router.get('/register', async (req, res) => {
  try {
    if(req.session.message) {
      const message = req.session.message;
      req.session.message = null
      res.json({
        status: 200,
        data: 'login unsuccessful',
        message: message, 
        loggedIn: req.session.loggedIn
      });
    } else {
      res.json({
        status: 200,
        data: 'login successful',
        message: null, 
        loggedIn: req.session.loggedIn
      });
    }
  } catch (err){
    console.log(err)
    res.send(err)
  }
});



// Find user
router.post('/login', (request, response) => {
  
  User.findOne({username: request.body.username}, (err, user) => {
    if(user){ // if user was found
      if(bcrypt.compareSync(request.body.password, user.password)) {
        request.session.username = user.username;
        request.session.loggedIn = true;
        res.json({
          status: 200,
          data: 'login successful',
          message: null, 
          loggedIn: req.session.loggedIn
        });
      } else {
        // set a message property on the request.session object
        request.session.message = 'Username or password is incorrect';
        ressponse.json({
          status: 200,
          data: 'login unsuccessful',
          message: message, 
          loggedIn: req.session.loggedIn
        });
      }
    } else {
      // set a message property on the request.session object
      request.session.message = 'Username or password is incorrect';
      response.json({
        status: 200,
        data: 'login successful',
      });
    }
  });
})

router.post('/register', (request, response) => {
  const password = request.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // PREVENT DUPE USERNAMES
  // if a user exists in the db with the desired username
  User.find({username: request.body.username}, (err, foundUsers) => {
    // now we know that .find() returns an array
    console.log(foundUsers)
    if(foundUsers.length > 0){
      // show the registration page with a message that says "username already taken"
      request.session.message = 'Username already exists';
      response.json({
        status: 200,
        data: 'login successful',
      });
    } 
    // (a user does not already exist in the db with that username)
    else {
      // Create new user
      const userDbEntry = {};
      userDbEntry.username = request.body.username;
      userDbEntry.password = passwordHash;
      userDbEntry.firstName = request.body.firstName;
      userDbEntry.lastName = request.body.lastName;
      userDbEntry.address = request.body.address;
      userDbEntry.city = request.body.city;
      userDbEntry.state = request.body.state;
      userDbEntry.zip = request.body.zip;
      userDbEntry.phone = request.body.phone;
      userDbEntry.email = request.body.email;

      // Create entry into database
      User.create(userDbEntry, (err, user) => {
        request.session.username = user.username;
        request.session.loggedIn = true;
        console.log("registration successful");
        response.json({
          status: 200,
          data: 'login successful',
        }); // REDIRECT SHOULD TAKE A URL
      });
    }
  })
});


router.get('/profile', (request, response) => {
  User.findOne({username: request.session.username}, (err, foundUser) => {
    console.log(foundUser, " this is foundUser in GET /auth/profile")
    response.json({
      status: 200,
      data: 'login unsuccessful',
      message: message, 
      userData: foundUser,
      username: request.session.username,
      loggedIn: request.session.loggedIn
    });
  });
});



// maybe make it so password can be changed/updated

router.post('/profile', (request, response) => {
  const password = request.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // Create an object to enter into the user model
  const userDbEntry = {};
  userDbEntry.username = request.body.username;
  userDbEntry.password = passwordHash;

  // PREVENT DUPE USERNAMES
  // if a user exists in the db with the desired username
  User.find({username: request.body.username}, (err, foundUsers) => {
      User.create(userDbEntry, (err, user) => {
        request.session.username = user.username;
        request.session.loggedIn = true;
        console.log("update");
        response.json({
          status: 200,
          data: 'login successful',
        });
      });
  });
});



// Logging out
router.get('/logout', (request, response) => {
  request.session.destroy((err) => {
    if(err) {
      response.send('error destroying session');
    } else {
      response.json({
        status: 200,
        data: 'login successful',
      });
    }
  });
});

router.get('/header', (request, response) => {
  User.find(request.params.id, (err, foundUser) => {
    response.json({
      status: 200,
      data: 'login successful',
      users: foundUser
    });   
  })
})






// connect to restaurant info and commenting page
router.post('/show', async (req, res) => {
  console.log(req.session, ' this is session')
  try {
    const createdComment = await User.create(req.body);

    req.session.logged = true;
    req.session.username = req.body.username;


    res.json({
      status: 200,
      data: 'login successful'
    });



  } catch(err){
    console.log(err);
    res.send(err);
  }
});
























module.exports = router;
