var mongoose = require('mongoose');
var ngoSchema = new mongoose.Schema({
    name: String,
    password: String,
    location: String,
    type : String,
    mission: String,
    impact_area: String,
    funding_needs: Number,
    previous_works: [String]
});

var NGO = mongoose.model('NGO', ngoSchema);

module.exports ={
    NGO
};