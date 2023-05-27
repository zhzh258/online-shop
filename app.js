const express = require("express");
const path = require("path");
const fs = require("fs");
const csrf = require("csurf");

const db = require("./data/database/database")
const routes_auth = require("./routes/routes.auth");
const routes_default = require("./routes/routes.default")
const routes_admin = require("./routes/routes.admin")
const routes_products = require("./routes/routes.products")

const middleware_add_csrf_token = require("./middlewares/add-csrf-token")
const middleware_express_session = require("./middlewares/express-session")
const middleware_handle_error = require("./middlewares/handle-error")
const middleware_check_auth = require("./middlewares/check-auth")
const middleware_check_admin = require("./middlewares/check-admin")

const app = express();

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use("/products/assets/images", express.static("data/images/products"));
app.use(express.urlencoded({ extended: false }));

app.use(middleware_express_session);
app.use(csrf()); 
app.use(middleware_add_csrf_token);


// app.use(middleware_handle_error);
app.use(middleware_check_auth)


// routes
app.use("/", routes_default)
app.use("/", routes_auth);
app.use("/", routes_products);
app.use(middleware_check_admin);
app.use("/admin", routes_admin);

db.connectDB()
    .then(function(){
        app.listen(4000);
    })
    .catch(function(error){
        console.log('Failed to connect to the database!');
    })
