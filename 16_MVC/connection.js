const mongoose = require('mongoose');

async function connectMongooseDB(url) {
    try {
        console.log('Connecting to MongoDB...');
        return await mongoose.connect(url);
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
    }
}

module.exports = connectMongooseDB;