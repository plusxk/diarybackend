const config = require('../config');
const env = process.env.NODE_ENV || 'test';
const mongoose = require('mongoose');


module.exports.connect = (async () => {
    try {
        await mongoose.connect(config.db[env], config.dbParams);
        console.log('MongoDB Connected');
    } catch(err) {
        console.log(err);
    }
});

module.exports.closeDatabase = (async () => {
    await mongoose.connection.close();
});

module.exports.clearDatabase = (async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});