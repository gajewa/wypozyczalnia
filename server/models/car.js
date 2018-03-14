var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    seats: Number,
    body: String,
    engine: String,
    price: Number,
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Car', CarSchema, 'cars');