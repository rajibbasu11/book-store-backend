const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database Connected!')
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

module.exports = connectDB;