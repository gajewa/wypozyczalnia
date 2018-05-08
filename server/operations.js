const express = require('express');
const router = express.Router();

const Car = require('./models/car.js');
const Rental = require('./models/clientRental.js');
const User = require('./models/user.js');
const Operation = require('./models/opertaion.js');


router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.get('/', (req, res, next) => {
   Operation.find((err, operations) => {
       if(err) return err;

       res.json(operations);
   });
});

router.get('/:carId', (req, res, next) => {
    Operation.find({carId: req.params.carId})
        .exec((err, operations) => {
            if(err) return err;

            res.json(operations);
        })
})

router.post('/', (req, res, next) => {
    Operation.create(req.body, (err, op) => {
        if(err) return err;

        res.json(op);
    })
})
module.exports = router;