var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var ngoSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type : String,
    location: String,
    prevWork: String,
    mission: String,
    impact: String,
    funding: String,
});

//password encryption
ngoSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

//checking if password matches
ngoSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

var NGO = mongoose.model('NGO', ngoSchema);

module.exports ={
    NGO
};