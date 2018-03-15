const express = require('express');
const bodyParser= require('body-parser')
const app = express()
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var Car = require('./models/car.js');

app.listen(3001, function () {
    console.log('listetning on 3001');
})

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://admin:admin@ds211309.mlab.com:11309/cars', { promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));



app.use(function (req, res, next) {

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



app.get('/cars', function(req, res, next) {
    Car.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

app.post('/cars', function (req, res, next) {
    console.log(req.body);
    Car.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

app.get('/cars/:id', (req, res, next) => {

    Car.findById(req.params.id, (err, post) => {
        if(err) return err;

        res.json(post);
    });
});

app.put('/cars/:id', function(req, res, next){

    console.log(req.params.id);
    console.log(req.body);

    Car.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err)
        console.log(err);
    res.json(post);
    });
});

app.delete('/cars/:id', function (req, res, next) {

    console.log(req.params.id);

    Car.findByIdAndRemove(req.params.id, req.body, function (err, post) {

        if(err) return err;

        res.json(post);
    })
})

app.get('/cars/name/:name', function (req, res, next) {

    Car.find({'make':req.params.name}, function (err, car) {
        if(err) return err;

        res.json(car);
    })
})