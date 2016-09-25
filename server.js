var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require("mysql");
var cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, './client')));
require('./server/config/mysql.js');
require('./server/config/routes.js')(app);


app.listen(8004, function() {
  console.log("Listening on Port 8004");
})

app.options('*', cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8004");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

// app.get('/', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     contents = fs.readFileSync("sliderImages.json", "utf8");
//     console.log(path.join(__dirname, '/sliderImages.json'));
//     res.end(contents);
//  });
//
// app.all("/api/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     return next();
// });
