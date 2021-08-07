const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    name: String,
    link: String
});

module.exports = mongoose.model('Resource', resourceSchema);




