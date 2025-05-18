

const mongoose = require('mongoose');
require('dotenv').config();

// Asynchronous function to connect to the database
async function connectDB() {
    try {
        // Options to handle deprecation warnings
        const mongooseOptions = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        };

        // Connecting to MongoDB using Mongoose
        const conn = await mongoose.connect(process.env.DB_URI, mongooseOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
