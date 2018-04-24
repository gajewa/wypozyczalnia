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
    payment: Number,
    status: { type: String, default: "Oczekujące" },
    discount: { type: Number, default: 0 }
});

module.exports = mongoose.model('ClientRental', ClientRentalSchema, 'clientRentals');