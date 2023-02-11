var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nazraf:nandanaisaloser1@trinit.wyslvwy.mongodb.net/test');
const schema = require('../schema/ngoschem');

var ngos = [
    {
        name: 'Greenpeace',
        location: 'New York',
        type: 'idk',
        mission: 'To protect and conserve the environment',
        impact_area: 'Environmental Conservation',
        funding_needs: 100000,
        previous_works: ['Protected Rainforests', 'Stopped Whaling']
    },
    {
        name: 'Doctors Without Borders',
        location: 'Paris',
        type: 'lolz',
        mission: 'To provide medical assistance to people in need',
        impact_area: 'Healthcare',
        funding_needs: 500000,
        previous_works: ['Provided Aid to Syrian Refugees', 'Treated Ebola Patients']
    }
];


for (var i = 0; i < ngos.length; i++) {
    var ngo = new schema.NGO(ngos[i]);
    ngo.save(function (err) {
        if (err) return console.log(err);
        console.log('NGO inserted into the database');
    });
}
