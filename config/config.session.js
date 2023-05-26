const mongodb_store = require("connect-mongodb-session")

function store(session){
    const Mongodb_store = mongodb_store(session);
    return new Mongodb_store({
        uri: 'mongodb://127.0.0.1:27017',
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