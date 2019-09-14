var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
	'date': Date,
	'amount': {
		type: Number,
		default: 10000
	},
	'screenshot': {
		type: String,
		default: ""
	},
	'hasPaid': {
		type: Boolean,
		default: false
	},
	'user': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('invoice', invoiceSchema);
