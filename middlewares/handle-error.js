function middleware_handle_error(error, req, res, next){
    console.log(error);
    res.status(500).render("default/error", {errorType : 500});
    next();
}

module.exports = middleware_handle_error;