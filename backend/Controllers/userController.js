const User = require('../Models/userModel');

const userctrl = {
    searchUser: async (req, res) => {
        try {
            const users = await User.find({ username: { $regex: req.params.query, $options: 'i' } })
                .limit(10)
                .select("firstName lastName username profilePic");
            res.json({ users });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    followUser: async (req, res) => {
        try {
            const { userId, followId } = req.body;
            const user = await User.findById(userId);
            const followUser = await User.findById(followId);

            if (!user || !followUser) {
                return res.status(404).json({ msg: "User not found" });
            }

            if (user.following.includes(followId)) {
                return res.status(400).json({ msg: "You are already following this user" });
            }

            user.following.push(followId);
            followUser.followers.push(userId);

            await user.save();
            await followUser.save();

            res.json({ msg: "User followed successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    unfollowUser: async (req, res) => {
        try {
            const { userId, unfollowId } = req.body;
            const user = await User.findById(userId);
            const unfollowUser = await User.findById(unfollowId);

            if (!user || !unfollowUser) {
                return res.status(404).json({ msg: "User not found" });
            }

            user.following = user.following.filter(id => id.toString() !== unfollowId);
            unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== userId);

            await user.save();
            await unfollowUser.save();

            res.json({ msg: "User unfollowed successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getFollowing: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).populate('following', 'userName profilePic firstName lastName');
            res.json({ following: user.following });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getFollowers: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).populate('followers', 'userName profilePic firstName lastName');
            res.json({ followers: user.followers });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId;            
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            res.json({ user });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getLikedPosts : async(req, res) => {
        try {
            const  userId  = req.params.userId;
            const user = User.findById(userId);
            if(!user) return res.status(400).json({ msg : "user doesnt exist"});
            const userLikedPosts = user.likedPosts;
            res.json({ userLikedPosts })
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getPosts : async(req, res) => {
        try {
            const userId = req.params.userId;
            const user = User.findById(userId);
            if(!user) return res.status(400).json({ msg : "user doesnt exist"});
            const userPosts = user.posts;
            res.json({ userPosts });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = userctrl;