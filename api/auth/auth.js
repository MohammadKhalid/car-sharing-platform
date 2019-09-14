var express = require('express');
var router = express.Router();
var userModel = require('../user/userModel.js');
router.post('/login', function (req, res) {
    var phone = req.body.phone || "";
    var password = req.body.password || "";
    userModel.findOne({ 'phone': phone, approved: true }, function (err, user) {
        if (err) {
            console.log('error in fatching the data');
            res.sendStatus(500);
        }
        else {
            if (user && user.password == password) {
                req.session.phone = user.phone;
                req.session.uType = "user";
                req.session.uid = user._id;
                res.redirect('/user');
            }
            else {
                res.redirect('/login-page.html');
            }
        }
    })
});

router.post('/admin-login', function (req, res) {
    var phone = req.body.phone || "";
    var password = req.body.password || "";
    if (phone == "3365971717" && password == "technologic") {
        req.session.phone = phone;
        req.session.uType = "admin";
        req.session.uid = "0";
        res.redirect('/owner');
    }
    else {
        res.redirect('/admin-login.html');
    }
});

router.post('/isAuthenticated', function (req, res) {
    if (req.session && req.session.phone) {
        res.status(200).json({ message: true });
    } else {
        res.status(403).json({ message: false });
    }
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.post("/switch-to-user", function (req, res) {
    var phone = req.body.phone || "";
    var uid = req.body._id || "";
    if (req.session && req.session.uType == 'admin') {
        req.session.phone = phone;
        req.session.uid = uid;
        res.status(200).json({ message: true });
    } else {
        res.status(403).json({ message: false });
    }
});

module.exports = router;