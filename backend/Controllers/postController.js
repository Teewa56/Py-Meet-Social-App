const Post = require('../Models/postModel');
const User = require('../Models/userModel');

const postController = {
    postText : async(req, res) => {
        try {
            const { posterId } = req.params.id;
            const { postText } = req.body;
            const author = User.findById(posterId);
            if(!author) return res.status(400).json({msg : "This poster doesnt exist!"});
            const timeStamp = `${new Date().getDay()}, ${new Date().getHours()} : ${new Date().getMinutes()}`;
            const newPost = new Post({ 
                author, 
                PostText : postText, 
                timeStamp  
            });
            await newPost.save();
            author.posts.push(newPost._id);
            await author.save();
            res.status(200).json({ 
                msg : "Post Made succesfully", 
                post : newPost
            })
        } catch (error) {
            res.status(500).json({ msg : error.message})
        }
    },
    postImage : async(req, res) => {
        try {
            const { posterId } = req.params.id;
            const { postImg, postCaption } = req.body;
            const author = User.findById(posterId);
            if(!author) return res.status(400).json({ msg : "This poster does not exist"});
            const timeStamp = `${new Date().getDay()}, ${new Date().getHours()} : ${new Date().getMinutes()}`;
            const newPost = new Post({
                author, 
                PostImage : postImg, 
                postImageCaption : postCaption, 
                timeStamp
            });
            await newPost.save();
            author.posts.push(newPost._id);
            await author.save();
            res.json({
                msg : "Succesfully posted!",
                post : newPost
            })
        } catch (error) {
            res.status(500).json({msg : error.message});
        }
    },
    likePost : async(req , res) => {
        try {
            const { likerId, postId } = req.params;
            const Liker = User.findById(likerId);
            const post = Post.findById( postId );
            if(!Liker || !post) return re.status(400).json({ msg : "one of you doesnt exist doesn't exist"});
            if(post.postLikes.includes(postId)) return res.status(400).json({ msg : "you already liked this post"});
            post.postLikes.push(likerId);
            Liker.likedPosts.push(postId);
            await post.save();
            await Liker.save();
            res.json({ msg : "Liked"})
        } catch (error) {
            res.status(500).json({ msg  : error.message});
        }
    },
    unlikePost : async(req, res) => {
        try {
            const {unlikerId, postId} = req.params;
            const unLiker = User.findById(unlikerId);
            const post = Post.findById(postId);
            if(!post || !unLiker) return res.status(400).json({msg : "you already unliked this post"});
            post.postLikes = post.postLikes.filter(id => id.toString() !== unlikerId);
            unLiker.likedPosts = unLiker.likedPosts.filter(id => id.toString() !== postId)
            await post.save();
            await unLiker.save();
            res.json({msg : "Unliked"})
        } catch (error) {
            res.status(500).json({msg : error.message});
        }
    },
    deletePost : async(req, res) => {
        try {
            const { postId, deleterId } = req.params;
            const post = Post.findById(postId);
            const deleter = User.findById(deleterId);
            if(!post) return res.status(400).json({msg : "Post not found"});
            const author = post.auhtor;
            if(deleter !== author ) return res.status(400).json({ msg : "You can't perform this action!"});
            await Post.findByIdAndDelete(postId);
            res.json({msg : "deleted post succesfully!"});
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    editPost : async(req, res) => {
        try {
            const {postId, editerId} = req.params;
            const { data } = req.body;
            const post = Post.findById(postId);
            const editer = User.findById(editerId);
            const author = post.author;
            if(author !== editer) return res.status(400).json({ msg  : "you cannot perform this action"});
            const postText = data.postText;
            const postImage = data.postImage;
            const postImageCaption = data.postImageCaption;
            if(!postText) {
                post.postImage = postImage
                post.postImageCaption = postImageCaption
            } 
            if(!postImage && !postImageCaption){
                post.postText = postText
            }
            await post.save();
            res.json({msg : "post edited succesfully", post : {post} });
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    getAllPosts : async(req, res) => {
        try {
            const allPosts = Post.find({});
            res.json({allPosts});
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    }
}

module.exports =  postController;