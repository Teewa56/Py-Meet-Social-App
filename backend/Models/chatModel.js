const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    receiver : [{type: mongoose.Schema.Types.ObjectId, ref : "User" , unique : true}],
    sender : [{type : mongoose.Schema.Types.ObjectId, ref : "User", unique : true}],
    content : {type : String, maxLength : 200},
    timeStamp : {type : Date, default : Date.now},
    edited : {type: Boolean, default : false}
});

module.exports = mongoose.model('Chat', chatSchema);