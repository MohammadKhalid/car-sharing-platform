var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const MongoStore = require('connect-mongo')(session);
var compression = require('compression')

var mongoose = require('./database/mongoose');
var user = require('./api/user/userRoutes');
var car = require('./api/car/carRoutes');
var invoice = require('./api/invoice/invoiceRoutes');
var auth = require('./api/auth/auth');
var security = require('./api/auth/security');
var mail = require('./api/mail/mail');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(compression())

app.use(session({
	secret: 'programmers always pay their depts',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use('/api/user', user);
app.use('/api/car', car);
app.use('/api/invoice', invoice);
app.use('/api/auth', auth);
app.use('/api/mail', mail);
app.use('/user', security.guard, express.static(__dirname + '/builds/user'));
app.use('/owner', security.isAdmin, express.static(__dirname + '/builds/owner'));
app.use('/uploads', security.guard, express.static(__dirname + '/uploads'));
app.get('/uploads/*', security.guard, function(req, res){res.sendFile(__dirname + '/uploads/no-preview.png')})
app.use('/paidinvoices', security.guard, express.static(__dirname + '/paidinvoices'));
app.use('/', security.redirectLoggedIn, express.static(__dirname + '/public'));

// start server on the specified port and binding host
app.listen(8080, '0.0.0.0', function () {
	// print a message when the server starts listening
	console.log("server starting");
});

// process.on('uncaughtException', function (err) {
// 	console.log('Caught exception: ' + err);
// });

// test