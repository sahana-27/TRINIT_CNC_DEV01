var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nazraf:nandanaisaloser1@cluster0.6uipfrv.mongodb.net/test');
const schema = require('../schema/philschema');


var philanthropists = [
    {
        name: 'Bill Gates',
        password: '9012',
        location: 'Seattle',
        donation_preferences: ['Healthcare', 'Education'],
        past_donations: ['Doctors Without Borders', 'UNICEF']
    },
    {
        name: 'Warren Buffett',
        password: '3456',
        location: 'Omaha',
        donation_preferences: ['Environmental Conservation', 'Poverty Alleviation'],
        past_donations: ['Greenpeace', 'World Food Programme']
    }
];


for (var i = 0; i < philanthropists.length; i++) {
    var philanthropist = new schema.Philanthropist(philanthropists[i]);
    philanthropist.save(function (err) {
        if (err) return console.log(err);
        console.log('Philanthropist inserted into the database');
    });
}
