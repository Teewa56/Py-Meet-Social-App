const Post = require('../Models/postModel');
const User = require('../Models/userModel');

const postController = {
    postText : async(req, res) => {
        try {
            const { postText, posterId } = req.body;
            const author = await User.findById(posterId);
            if(!author) return res.status(400).json({msg : "This poster doesnt exist!"});
            const timeStamp = `${new Date().getHours()} : ${new Date().getMinutes()}`;
            const newPost = new Post({ 
                author: {
                    _id: author._id,
                    firstName: author.firstName,
                    lastName: author.lastName,
                    userName: author.userName,
                    profilePic: author.profilePic
                }, 
                postText, 
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
            const { data, posterId  } = req.body;
            const { postImage, postImageCaption } = data;
            const author = await User.findById(posterId);
            if(!author) return res.status(400).json({ msg : "This poster does not exist"});
            const timeStamp = `${new Date().getHours()} : ${new Date().getMinutes()}`;
            const newPost = new Post({
                author: {
                    _id: author._id,
                    firstName: author.firstName,
                    lastName: author.lastName,
                    userName: author.userName,
                    profilePic: author.profilePic
                },  
                postImage, 
                postImageCaption, 
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
    likePost : async (req, res) => {
        try {
            const { likerId } = req.body;
            const { postId } = req.params;
            const Liker = await User.findById(likerId);
            const post = await Post.findById(postId);
    
            if (!Liker || !post) return res.status(400).json({ msg: "One of you doesn't exist" });
            if (post.postLikes.map(id => id.toString()).includes(likerId)) {
                return res.status(400).json({ msg: "You already liked this post" });
            }
            post.postLikes.push(likerId);
            Liker.likedPosts.push(postId);
            await post.save();
            await Liker.save();
    
            res.json({ msg: "Liked" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },    
    unlikePost : async(req, res) => {
        try {
            const { unlikerId } = req.body;
            const { postId } = req.params;
            const unLiker = await User.findById(unlikerId);
            const post = await Post.findById(postId);
    
            if (!post || !unLiker) return res.status(400).json({ msg: "Invalid request" });
    
            post.postLikes = post.postLikes.filter(id => id.toString() !== unlikerId);
            unLiker.likedPosts = unLiker.likedPosts.filter(id => id.toString() !== postId);
    
            await post.save();
            await unLiker.save();
    
            res.json({ msg: "Unliked" });
        } catch (error) {
            res.status(500).json({msg : error.message});
        }
    },
    deletePost : async(req, res) => {
        try {
            const { deleterId } = req.query;
            const { postId } = req.params;
            const post = await Post.findById(postId);
            const deleter = await User.findById(deleterId);
    
            if (!post) return res.status(400).json({ msg: "Post not found" });
    
            const author = post.author.toString();
            if (deleter._id.toString() !== author) return res.status(400).json({ msg: "You can't perform this action!" });
    
            await Post.findByIdAndDelete(postId);
            res.json({ msg: "Deleted post successfully!" });
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    editPost : async(req, res) => {
        try {
            const { postId} = req.body; 
        const { data ,  editerId } = req.body;
        const post = await Post.findById(postId);
        const editer = await User.findById(editerId);

        if (!post) return res.status(400).json({ msg: "Post not found" });
        if (!editer) return res.status(400).json({ msg: "User not found" });

        const author = post.author.toString();
        if (author !== editer._id.toString()) return res.status(400).json({ msg: "You cannot perform this action" });

        if (data.postText) post.postText = data.postText;
        if (data.postImage) post.postImage = data.postImage;
        if (data.postImageCaption) post.postImageCaption = data.postImageCaption;

        await post.save();
        res.json({ msg: "Post edited successfully", post });
        } catch (error) {
            res.status(500).json({ msg : error.message});
        }
    },
    getPostById: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ msg: "Post not found" });
            res.json(post);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const allPosts = await Post.find({})
                .populate("author", "firstName lastName userName profilePic")
                .select("postText postImage postLikes comments timeStamp");
    
            res.json(allPosts);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }    
}

module.exports =  postController;