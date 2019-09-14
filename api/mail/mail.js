var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();


var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'ammar_172@outlook.com',
        pass: 'hacker543608'
    }
});

// var mailOptions = {
//     from: 'ammar_172@outlook.com',
//     to: 'mohsini172@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

router.post('/contact-us', function (req, res) {
    var mailOptions = {
        from: 'ammar_172@outlook.com',
        to: 'wheelink123@gmail.com',
        subject: '[Feedback]'+req.body.subject,
        text: `
        From: `+req.body.name+`
        Email: `+req.body.email+`
        Message: `+req.body.message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.send("Thank you for your message.")
        }
    });
});


module.exports = router;