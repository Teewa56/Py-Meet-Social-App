const Post = require("../Models/postModel");
const Comment = require("../Models/commentModel");
const User = require("../Models/userModel");

const commentController = {
    makeComment : async (req, res) => {
        try {
            const { postId, commenterId } = req.params;
            const { comment } = req.body;
            const post = await Post.findById({postId});
            const author = await User.findById({commenterId});
            const timeStamp = `${new Date().getDay()}, ${new Date().getHours()} : ${new Date().getMinutes()}`;
            const newComment = new Comment({ 
                commenter : author,
                commentText : comment,
                timeStamp 
            });
            post.comments.push(postId);
            await newComment.save();
            res.json({ msg : "Comment made succesfully", comment : { newComment }})
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    likeComment : async (req, res) => {
        try {
            const { likerId, commentId} = req.params;
            const liker = await User.findById(likerId);
            const comment = await Comment.findById(commentId);
            if(!liker || !comment) return res.status(400).json({ msg : "User doesnt exixt"});
            if(comment.commentLikes.includes(likerId)) return res.status(400).json({ msg : "You already liked this post"}); 
            comment.commentLikes.push(likerId)
            await Comment.save();
            res.json({ msg : "Post liked succesfully!"});
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    unlikeComment : async(req, res) => {
        try {
            const { unlikerId, commentId } = req.params;
            const comment = await Comment.findById(commentId);
            const unliker = await User.findById(unlikerId);
            if(!unliker || !comment) return res.status(400).json({ msg : "User doesnt exixt in this group"});
            comment.commentLikes = comment.commentLikes.filter(id => id.toString() !== commentId);
            await comment.save();
            res.json({ msg : "Post unliked succesfully!"});
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    deleteComment : async (req, res) => {
        try {
            const { deleterId, commentId } = req.body;
            const deleter = User.findById({deleterId});
            const commenter =  (Comment.findById({commentId})).commenter;
            if( deleter !== commenter ) return res.status(400).json({ msg : "You cannot perform this action!"});
            await Comment.findByIdAndDelete({commentId});
            res.json({ msg : "Deleted succesfully!"})
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    editComment: async(req, res) => {
        try {
            const {editerId, commentId } = req.params;
            const { comment } = req.body;
            const editer = User.findById({editerId});
            const reqComment = Comment.findById({commentId});
            const commenter = reqComment.commenter;
            if( commenter !== editer ) return res.status(400).json({ msg : "You cannot perform this action"});
            reqComment.commentText = comment;
            await reqComment.save();
            res.json({ msg : "Comment edited succesfully!", comment : {reqComment} })
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    }
};

module.exports = commentController;