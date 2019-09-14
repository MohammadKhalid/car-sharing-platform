

module.exports = {
    isLoggedIn: isLoggedIn,
    guard: guard,
    redirectLoggedIn: redirectLoggedIn,
    isAdmin: isAdmin
}

function isLoggedIn(req, res, next){
    if(req.session && req.session.phone){
        next();
    }else{
        res.sendStatus(403);
    }
}

function guard(req, res, next){
    if(req.session && req.session.phone){
        next();
    }else{
        res.redirect('/login-page.html');
    }
}

function isAdmin(req, res, next){
    if(req.session && req.session.uType == "admin"){
        next();
    }else{
        res.redirect('/login-page.html');
    }
}

function redirectLoggedIn(req, res, next){
    if((req.url == '/login-page.html') && req.session && req.session.phone){
        res.redirect('/user');
    }else{
        next();
    }
}