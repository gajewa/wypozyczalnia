var mongoose = require('mongoose');

var ClientRentalSchema = new mongoose.Schema({
    carId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: Date,
    endDate: Date,
    status: { type: String, default: "Oczekujące" }
});

module.exports = mongoose.model('ClientRental', ClientRentalSchema, 'clientRentals');

// populate, relacje relation mongoose