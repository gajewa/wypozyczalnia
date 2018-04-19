var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    seats: Number,
    body: String,
    engine: String,
    price: Number,
    totalIncome: Number,
    totalRentals: { type: Number, default: 0},
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Car', CarSchema, 'cars');