var mongoose = require('mongoose');
var philanthropistSchema = new mongoose.Schema({
    name: String,
    password: String,
    location: String,
    donation_preferences: [String],
    past_donations: [String]
});

var Philanthropist = mongoose.model('Phil', philanthropistSchema);

module.exports ={
    Philanthropist
};