// This is where we will set up our db connection
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pacific-brook-68809';
// food is the name of our database
// that is automatically created
mongoose.connect( mongoUri, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, ' mongoose failed to connect')
});

mongoose.connection.on('disconncted', () => {
  console.log('Mongoose is disconnected')
});
