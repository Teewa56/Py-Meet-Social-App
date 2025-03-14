const Post = require("../Models/postModel");
const Comment = require("../Models/commentModel");
const User = require("../Models/userModel");

const commentController = {
    makeComment: async (req, res) => {
        try {
            const { postId } = req.params;
            const { comment, commenterId } = req.body;

            const post = await Post.findById(postId);
            if (!post) return res.status(400).json({ msg: "Post not found" });

            const timeStamp = new Date().toLocaleTimeString();

            const newComment = new Comment({ 
                post: postId,  // Fixed missing reference to the post
                commenter: commenterId,
                commentText: comment,
                timeStamp 
            });

            post.comments.push(newComment._id);
            await newComment.save();
            await post.save();

            res.json({ msg: "Comment made successfully", comment: newComment });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    likeComment: async (req, res) => {
        try {
            const { likerId, commentId } = req.params;
            const liker = await User.findById(likerId);
            const comment = await Comment.findById(commentId);

            if (!liker) return res.status(400).json({ msg: "User does not exist" });
            if (!comment) return res.status(400).json({ msg: "Comment not found" });

            if (comment.commentLikes.includes(likerId)) {
                return res.status(400).json({ msg: "You already liked this comment" });
            }

            comment.commentLikes.push(likerId);
            await comment.save();
            res.json({ msg: "Comment liked successfully!" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    unlikeComment: async (req, res) => {
        try {
            const { unlikerId, commentId } = req.params;
            const comment = await Comment.findById(commentId);
            const unliker = await User.findById(unlikerId);

            if (!unliker) return res.status(400).json({ msg: "User does not exist" });
            if (!comment) return res.status(400).json({ msg: "Comment not found" });

            comment.commentLikes = comment.commentLikes.filter(id => id.toString() !== unlikerId);
            await comment.save();
            res.json({ msg: "Comment unliked successfully!" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const { deleterId, commentId } = req.body;

            const deleter = await User.findById(deleterId);
            const comment = await Comment.findById(commentId);

            if (!comment) return res.status(400).json({ msg: "Comment not found" });

            if (comment.commenter.toString() !== deleter._id.toString()) {
                return res.status(400).json({ msg: "You cannot perform this action!" });
            }

            await Comment.findByIdAndDelete(commentId);
            res.json({ msg: "Comment deleted successfully!" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    editComment: async (req, res) => {
        try {
            const { editerId, commentId } = req.params;
            const { comment } = req.body;

            const editer = await User.findById(editerId);
            const reqComment = await Comment.findById(commentId);

            if (!reqComment) return res.status(400).json({ msg: "Comment not found" });

            if (reqComment.commenter.toString() !== editer._id.toString()) {
                return res.status(400).json({ msg: "You cannot perform this action" });
            }

            reqComment.commentText = comment;
            await reqComment.save();

            res.json({ msg: "Comment edited successfully!", comment: reqComment });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    getCommentById: async (req, res) => {
        try {
            const { commentId } = req.params;
            const comment = await Comment.findById(commentId).populate("commenter", "userName profilePic");

            if (!comment) return res.status(400).json({ msg: "Comment does not exist" });

            res.json({ msg: "Comment fetched successfully!", comment });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = commentController;
