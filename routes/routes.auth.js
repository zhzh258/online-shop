const express = require("express");
const controllers_auth = require("../controller/controller.auth");

const router = express.Router();

router.get("/signup", controllers_auth.get_signup);
router.post("/signup", controllers_auth.post_signup);
router.get("/login", controllers_auth.get_login);
router.post("/login", controllers_auth.post_login);


module.exports = router;