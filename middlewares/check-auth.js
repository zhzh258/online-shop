function middleware_check_auth(req, res, next) {
    const uid = req.session.uid;
  
    if (!uid) {
      return next();
    }
  
    res.locals.uid = uid;
    res.locals.isAuth = true;  
    next();
  }
  
  module.exports = middleware_check_auth;