var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    idNumber: String,
    phoneNumber: Number,
    address: String,
    moneySpent: Number,
    numberOfRentals: Number
});

module.exports = mongoose.model('User', UserSchema, 'users');