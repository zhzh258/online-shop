const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongodb_url = "mongodb://127.0.0.1:27017";

// MONGODB_URL from the environment
if(process.env.MONGODB_URL){
    mongodb_url = process.env.MONGODB_URL
}

async function connectDB() {
    const client = await MongoClient.connect(mongodb_url);
    database = client.db("online-shop");
}

function getDB() {
    if (!database) {
        throw new Error("Failed to connect to the database!");
    }
    return database;
}

module.exports = {
    connectDB: connectDB,
    getDB: getDB,
};
