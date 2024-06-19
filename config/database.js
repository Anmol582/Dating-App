const mongoose = require('mongoose');
const url = process.env.CONNECTION;
const options = {
    serverSelectionTimeoutMS: 5000
};
// Connect to MongoDB

mongoose.connect(url, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));


module.exports = mongoose;