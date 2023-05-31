const mongodb_store = require("connect-mongodb-session")

const mongodb_url = "mongodb+srv://zzh:doo1YnKEkXsFEojN@cluster0.o4yext9.mongodb.net/?retryWrites=true&w=majority";

// MONGODB_URL from the environment
if(process.env.MONGODB_URL){
    mongodb_url = process.env.MONGODB_URL;
}

function store(session){
    const Mongodb_store = mongodb_store(session);
    return new Mongodb_store({
        uri: mongodb_url,
        databaseName: 'online-shop',
        collection: 'sessions',
    })
}

function config(store){
    return{  
        secret: 'nonoxt',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    
    }
}

module.exports = {
    store: store, 
    config: config
}
