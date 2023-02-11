var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var philanthropistSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location: String,
    NGOPref: [String],
    pastDonations: String
});

//password encryption
philanthropistSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

//checking if password matches
philanthropistSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

var Philanthropist = mongoose.model('Phil', philanthropistSchema);

module.exports ={
    Philanthropist
};
