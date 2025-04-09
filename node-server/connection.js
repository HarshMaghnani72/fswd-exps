const { MongoClient } = require('mongodb');

async function connectMongo(url) {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
}

module.exports = { connectMongo };
