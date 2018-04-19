const express = require('express');
const bodyParser= require('body-parser')
const app = express()

var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var Car = require('./models/car.js');
var Rental = require('./models/clientRental.js');



app.listen(3001, function () {
    console.log('listetning on 3001');
})

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


var rentalsPath = require('./cars');
app.use('/cars', rentalsPath);

var rentalsPath = require('./rentals');
app.use('/rentals', rentalsPath);

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

app.get('/stats/rentals', function (req, res, next) {

    Car.find({}, 'totalIncome totalRentals make model body engine', function (err, data) {
        if(err) return err;

        res.json(data);
    })

})