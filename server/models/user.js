var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    idNumber: Number,
    phoneNumber: Number,
    adress: String,
    moneySpent: Number,
    numberOfRentals: Number
});

module.exports = mongoose.model('User', UserSchema, 'users');