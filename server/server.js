const express = require('express');
const bodyParser= require('body-parser')
const app = express()
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var Car = require('./models/car.js');

app.listen(3001, function () {
    console.log('listetning on 3001' + __dirname);
})

app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://admin:admin@ds211309.mlab.com:11309/cars', { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));


app.get('/cars', function(req, res, next) {
    Car.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

app.post('/cars', function (req, res, next) {
    Car.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
})
