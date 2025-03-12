const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    PostText : {type : String, maxLength : 200},
    PostImage : String,
    postImageCaption : String,
    author : [{type: mongoose.Schema.Types.ObjectId, ref : "User", }],
    postLikes: [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    comments : [{type : mongoose.Schema.Types.ObjectId, ref : "Comment"}],
    timeStamp : String
})

module.exports = mongoose.model('Post', postSchema)