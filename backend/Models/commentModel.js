const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post : [{type: mongoose.Schema.Types.ObjectId, ref : "Post"}],
    commenter : [{type: mongoose.Schema.Types.ObjectId, ref : "User", }],
    commentText : {type : String, maxLength : 200},
    commentLikes: [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    timeStamp : {type: String}
});

module.exports = mongoose.model("Comment", commentSchema);