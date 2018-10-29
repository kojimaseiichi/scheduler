const mongoose = require('mongoose');

// 舞台役者のスキーマ
const ActorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    rating: Number
});

module.exports = mongoose.model('Actor', ActorSchema)