const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String},
    email: {type : String, unique : true, required : true},
    password: String,
    firstName: String,
    lastName: String,
    age: String,
    bio: {
        maxLength: 200,
        type: String
    },
    profileSetUp: {type : Boolean, default : false},
    DOB: {
        day: String,
        month: String,
        year: String,
    },
    region: String,
    occupation: String,
    gender: String,
    profilePic: String,
    coverPic: String,
    followers: [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    following: [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    likedPosts: [{type : mongoose.Schema.Types.ObjectId, ref : "Post"}],
    posts: [{type : mongoose.Schema.Types.ObjectId, ref : "Post"}]
});

module.exports = mongoose.model('User', userSchema);