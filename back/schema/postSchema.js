var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    name: String,
    postText: String,
    fundTag: String
});

var Post = mongoose.model('Post', postSchema);

module.exports ={
    Post
};