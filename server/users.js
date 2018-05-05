var express = require('express');
var router = express.Router();
const app = express()

var Car = require('./models/car.js');
var Rental = require('./models/clientRental.js');
var User = require('./models/user.js');


const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


router.get('/', (req, res) => {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
})

router.get('/ranking', (req, res) => {
    User.find()
        .sort('-moneySpent')
        .limit(3)
        // .select('name lastName moneySpent numberOfRentals')
        .exec((err, users) => {
            res.json(users);
        })
})

router.post('/', (req, res) => {
    console.log(req.body)   
    User.find({'idNumber' : req.body.idNumber}, (err, user) => {
        console.log(user);
        if(user.length<1){
            User.create(req.body, function (err, post) {
                if (err) return err;
                res.json({"msg":"ok", "id": post.id});
            });
        } else {
            res.json({"msg": "User exists!"});
        }
    })
});

router.post('/idNumber', (req, res) => {
    console.log(req.body);
    User.find({'idNumber':req.body.idNumber}, (err, user) => {
        console.log(user);
        res.json(user);
    });
} )

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return err;
        console.log(user);
        res.json(user);
    })
})

router.put('/updateSpending', (req, res, next) => {

    User.findById(req.body.id, (err, user) => {
        if(err) return err;
        
        var newSum = req.body.payment + user.moneySpent;
        var newRentalNumber = user.numberOfRentals + 1;
        
        user.set({moneySpent: newSum});
        user.set({numberOfRentals: newRentalNumber});
        
        user.save((err, updatedUser) => {
            if(err) return err;

            res.json(updatedUser);
        })
    })

    // User.findByIdAndUpdate(req.body.id, { $set: { moneySpent: this.moneySpent + req.body.payment}}, {new: true}, (err, user) => {
    //     if (err) return err;
    //     res.json(user);
    // })
})

router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return err;
        res.json(user);
    })
})

router.get('/idNumber/:id', (req, res, next) => {
    User.find({'idNumber' : req.params.id}, (err, user) => {
        if(err) return err;
        res.json(user);
    })
})



module.exports = router;