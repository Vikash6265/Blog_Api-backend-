const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connection succesful : ${conn.connection.host}`);
    } catch (error) {
        console.log(`connection failed : ${error.message}`);
    }
};

module.exports = connectDB ;