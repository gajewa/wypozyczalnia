var mongoose = require('mongoose');

var OperationSchema = new mongoose.Schema({
    description: String,
    type: String,
    date: Date,
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }
});

module.exports = mongoose.model('Operation', OperationSchema, 'operations');