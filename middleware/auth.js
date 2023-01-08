module.exports = {
    ensureAuth: functiin (req, res, next){
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/')
        }
    }
}