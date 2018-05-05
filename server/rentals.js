var express = require('express');
var router = express.Router();

var Car = require('./models/car.js');
var Rental = require('./models/clientRental.js');
var User = require('./models/user.js');


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

router.get('/', function (req, res, next) {
    Rental.find(function (err, products) {
        if(err) return err;

        res.json(products);
    });
});

router.get('/test', (req, res) => {
     Rental.find({})
         .populate('carId', 'make model price')
         .exec((err, rents) => {
             if(err) return err;
             res.json(rents);
         })
 })

router.post('/', function (req, res, next) {

    Car.findById(req.body.carId, (err, car)=>{
        var time1 =  new Date(req.body.endDate).getTime();
        var time2 =  new Date(req.body.startDate).getTime();
        var days = calculateDays(time1 - time2);
        var payment = car.price * days * (1 - req.body.discount);
        req.body.payment = payment;
   
        newCarTotalIncome = car.totalIncome + payment;
        newCarTotalRentals = car.totalRentals + 1;
        
        car.set({totalRentals: newCarTotalRentals});
        car.set({totalIncome: newCarTotalIncome});
        car.save( (err, updatedCar) => {
            if(err) return err;  
        });            

        User.findById(req.body.userId, (err, user) => {
            
            newUserMoneySpent = user.moneySpent + payment;
            newUserNumberOfRentals = user.numberOfRentals + 1;

            user.set({moneySpent: newUserMoneySpent});
            user.set({numberOfRentals: newUserNumberOfRentals});

            user.save( (err, updatedUser) => {
                if(err) return err;
            });
        });

        Rental.create(req.body, function (err, post) {
            if(err) return next(err);
    
            res.json(post);
        });
    });

    
});

router.get('/:carId', function (req, res, next) {
    Rental.find({'carId' : req.params.carId}, function (err, data) {
        res.json(data);
    })
})

router.put('/:id', function(req, res, next){

    Rental.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err)
            console.log(err);
        res.json(post);
    });
});

router.get('/user/:userid', (req, res, next) => {
    Rental.find({'userId' : req.params.userid})
        .populate('carId')
        .exec( (err, data) => {
            if(err) return err;

            res.json(data);
        })
})

function calculateDays(time){
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(time / cd),
      h = Math.floor( (time - d * cd) / ch)
  
    if(h>0)
      d++;
  
    return d;
  }

module.exports = router;