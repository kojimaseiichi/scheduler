const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new mongoose.Schema({
    date: Date,
    actor: { type: Schema.Types.ObjectId, ref: 'Actor'},
    theater: {type: Schema.Types.ObjectId, ref: 'Theater'}
});

module.exports = mongoose.model('Schedule', ScheduleSchema)