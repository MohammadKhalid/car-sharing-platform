var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	'name': String,
	'email': String,
	'phone': { type : Number , unique : true, required : true, dropDups: true },
	'password': String,
	'address': String,
	'approved': { type: Boolean, default: false },
	'cars': [{
		type: Schema.Types.ObjectId,
		ref: 'car'
	}]
});

module.exports = mongoose.model('user', userSchema);
