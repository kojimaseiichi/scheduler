const mongoose = require('mongoose');

// 劇場のスキーマ
const TheaterSchema = new mongoose.Schema({
    name: String,
    address: String,
});

module.exports = mongoose.model('Theater', TheaterSchema)