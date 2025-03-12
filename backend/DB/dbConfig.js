const mongoose = require('mongoose');

const URL = process.env.MONGO_URL || 'mongodb+srv://teewa56:marcusantonymongo@pymeetdb01.j0dbv.mongodb.net/?retryWrites=true&w=majority&appName=pymeetdb01';

const connectDB = async() => {
    try{
        await mongoose.connect(URL);
        console.log('DB connected succesfully');
    } catch( error ){
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;