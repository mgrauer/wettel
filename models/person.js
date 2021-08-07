const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstname: String,
    lastname: String,
    name: String,
    level: String,
    role: String,
    team: String
});

module.exports = mongoose.model('Person', personSchema);
