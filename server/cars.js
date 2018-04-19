var express = require('express');
var router = express.Router();
const app = express()

var Car = require('./models/car.js');
var Rental = require('./models/clientRental.js');

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

router.get('/', (req, res) => {
    Car.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
})

router.post('/', (req, res) => {
    console.log(req.body)   
    Car.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Car.findById(req.params.id, (err, post) => {
        if(err) return err;
        res.json(post);
    });
});

router.put('/:id', function(req, res, next){
    Car.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err)
        console.log(err);
    res.json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    Car.findByIdAndRemove(req.params.id, req.body, function (err, post) {

        if(err) return err;

        res.json(post);
    })
})

router.get('/name/:name', function (req, res, next) {
    Car.find({'make':req.params.name}, function (err, car) {
        if(err) return err;
        res.json(car);
    })
})

module.exports = router;