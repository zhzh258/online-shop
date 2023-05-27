const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

async function connectDB() {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
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
