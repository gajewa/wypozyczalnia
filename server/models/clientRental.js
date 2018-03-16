var mongoose = require('mongoose');

var ClientRentalSchema = new mongoose.Schema({
    carId: String,
    startDate: Date,
    endDate: Date,
});

module.exports = mongoose.model('ClientRental', ClientRentalSchema, 'clientRentals');