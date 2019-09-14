var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({
  'images': Array,
  'title': String,
  'city': String,
  'area': String,
  'modelNo': Number,
  'regCity': String,
  'mileage': Number,
  'color': String,
  'price': Number,
  'description': String,
  'engineType': String,
  'engineCapacity': Number,
  'transmission': String,
  'assembly': String,
  'deleted': {
    type: Boolean,
    default: false
  },
  // 'registration': String,
  'features': Array,
  'uploadedBy': {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  'likes': [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});
carSchema.index({
  "title": "text",
  "description": "text",
  "city": "text",
  "area": "text",
  "color": "text",
  "transmission": "text",
  "assembly": "text",
  "features": "text"
});


let car = mongoose.model('car', carSchema);
// car.collection.dropIndexes();
module.exports = car;
