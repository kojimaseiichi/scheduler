const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    rating: Number
});

module.exports = mongoose.model('Actor', ActorSchema)