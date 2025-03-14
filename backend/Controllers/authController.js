const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const authController = {
    signUp: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide both email and password' });
        }

        try {
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const user_email = await User.findOne({ email });
            if (user_email) return res.status(400).json({ msg: "This email is already in use!" });
            if (password.length < 8) return res.status(400).json({ msg: 'Password must be at least 8 characters' });
            if (!specialChar) return res.status(400).json({ msg: 'Password must contain special characters' });
            const passwordHash = await bcrypt.hash(password, 13);
            const userName = req.body.userName || uuidv4();
            const newUser = new User({
                email,
                password: passwordHash,
                userName
            });
            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });
            res.cookie('refreshtoken', refresh_token, {
                httpOnly : true,
                path: '/api/refresh_token',
                maxAge: 24 * 30 * 60 * 60 * 1000 // 30 days
            });
            await newUser.save();
            res.status(200).json({
                msg: "Registered successfully",
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ msg: 'Duplicate key error: email already in use.' });
            }
            res.status(500).json({ msg: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 24 * 30 * 60 * 60 * 1000 // 30 days
            });

            res.json({
                msg: "Login successful",
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
            res.json({ msg: "Logged out" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    deleteAccount: async (req, res) => {
        try {
            const userId = req.user.id;
            await User.findByIdAndDelete(userId);
            res.json({ msg: "Account deleted successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    setUpProfile: async (req, res) => {
        try {
            const { profilePic, coverPic, firstName, lastName, age, userName, bio, DOB : {day, month, year}, region, hobby, occupation, gender } = req.body;
    
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            const existingUserName = await User.findOne({ userName : req.body.userName });
            if (existingUserName) {
                return res.status(400).json({ msg: 'Username already exists' });
            }
            user.profilePic = profilePic;
            user.coverPic = coverPic;
            user.firstName = firstName;
            user.lastName = lastName;
            user.age = age;
            user.userName = userName;
            user.bio = bio;
            user.DOB = { day, month, year};
            user.region = region;
            user.hobby = hobby;
            user.occupation = occupation;
            user.gender = gender;
            user.profileSetUp = true;
            await user.save();
    
            res.json({ msg: 'Profile updated successfully', user : {user}});
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server error' });
        }
    },

    editProfile: async (req, res) => {
        try {
            const {
                firstName,
                lastName,
                userName,
                age,
                bio,
                DOB,
                region,
                hobby,
                occupation,
                gender,
                profilePic,
                coverPic
            } = req.body;
    
            console.log(req.body); // Log the incoming request body
    
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
    
            console.log(user); // Log the user object
    
            const existingUserName = await User.findOne({ userName: req.body.userName });
            if (existingUserName && existingUserName._id.toString() !== req.user.id.toString()) {
                return res.status(400).json({ msg: "User name already in use" });
            }
    
            user.firstName = firstName;
            user.lastName = lastName;
            user.userName = userName;
            user.age = age;
            user.bio = bio;
            user.DOB = DOB || { day: '', month: '', year: '' };
            user.region = region;
            user.hobby = hobby;
            user.occupation = occupation;
            user.gender = gender;
            user.profilePic = profilePic;
            user.coverPic = coverPic;
    
            await user.save();
            res.json({ msg: "Profile updated successfully", user });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    generateToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please login now" });
            jwt.verify(rf_token, process.env.REFRESHTOKENSECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: "Invalid token" });
                const user = await User.findById(result.id).select("-password")
                    .populate('following followers');
                if (!user) return res.status(400).json({ msg: "User does not exist" });
                const access_token = createAccessToken({ id: user._id });
                res.json({
                    access_token,
                    user
                });
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESSTOKENSECRET, { expiresIn: '1d' });
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESHTOKENSECRET, { expiresIn: '30d' });
}
module.exports = authController;