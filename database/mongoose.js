var config = require('./config.json');

var mongoose = require('mongoose');
var options = {
    
    keepAlive: 300000,
    connectTimeoutMS: 300000,
    user: config.username,
    pass: config.password
};
mongoose.connect(config.url, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connected");
});

module.exports = mongoose;