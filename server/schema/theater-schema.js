const mongoose = require('mongoose');

const TheaterSchema = new mongoose.Schema({
    name: String,
    address: String,
});

module.exports = mongoose.model('Theater', TheaterSchema)