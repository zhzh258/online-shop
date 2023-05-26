const User = require("../model/model.user");
const util = require("../util/util.auth")

function get_signup(req, res){
    let temp = req.session.signup_cache;
    if(!temp){
        temp = util.init_cache_signup();
    }
    req.session.signup_cache = null;
    // console.log("The temp to be rendered: ====== ",temp);
    res.render("customer/auth/signup", {cache: temp});
}

async function post_signup(req, res){
    const user = new User();
    user.init_with_req(req);
    if(!util.is_valid(req) || await user.is_occupied()){
        util.cache_signup_error(req, function(){
            res.redirect("/signup")
        });
        return;
    }
    // else: authenticated
    await user.encrypt();
    user.store_in_DB();
    res.redirect("/login")
}

async function get_login(req, res){
    let temp = req.session.login_cache;
    if(!temp){
        temp = util.init_cache_login();
    }
    req.session.login_cache = null;
    // console.log("The temp to be rendered: ====== ",temp);
    res.render("customer/auth/login", {cache: temp});
}

async function post_login(req, res){
    const user = new User();
    user.init_with_req(req);
    // if: incorrect password || not existing
    const existing_id = await user.is_occupied();
    const uid = existing_id.toString();
    if(!existing_id || !await user.is_password_correct()){
        util.cache_login_error(req, function(){
            res.redirect("/login")
        });
        return;
    } 
    // else: authenticated
    req.session.uid = existing_id;
    req.session.save(function(){
        res.redirect('/')
    });
}

module.exports = {
    get_signup: get_signup,
    post_signup: post_signup,
    get_login: get_login,
    post_login: post_login,
}