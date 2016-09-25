module.exports = require('./node_modules/twitter-node-client/lib/Twitter');


var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require("mysql");
var cors = require('cors');



var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};
//
var config = {
    // "consumerKey": "atQxLad5JcrvWcIMKlqnR9oeV",
    // "consumerSecret": "ETH06tf84ksllM8f9eZBH1vvWu3pKX0GKzLsAxyFQNQG5VSTKe",
    // "accessToken": "33150462-T77e6XV5E0iW0an6AaHrub5A7xE39l2tefFegZM29",
    // "accessTokenSecret": "lgNDwTWRY3oiFeaA41SEgBTFkYOaJiVv2PJGKpFTnRePO"

    //new:
    "consumerKey": "H4Z0kyai8hRRdxkK8v8EJd1DV",
    "consumerSecret": "G7xn7bChr0GNJm9G6ruYXORegk5EmZKKlf4Jb9GTzCGHfZU7bP",
    "accessToken": "33150462-U1bwQMpZ3yFnAW9a9qtGcHGfNd1WRiTJnN4pxtFNT",
    "accessTokenSecret": "qChSeUipu3AvElO68ky7BOvaEZgOhbPwn0iBGzmJXDsTm",
    "signature_method":"HMAC-SHA1"
};



var twitter = new module.exports.Twitter(config);

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


//post to retrieve user data
app.post('/twitter/user', function (req, res) {
    var username = req.body.username;
    var data = twitter.getUser({ screen_name: username}, function(error, response, body){
        res.status(404).send({
            "error" : "User Not Found"
        });
    }, function(data){
        res.send({
            result : {
                "userData" : data
            }
        });
    });
});

app.get('/twitter/search/:hashtag', function (req, res) {
    var hashname = req.params.hashtag;

    var data = twitter.getSearch({'q':'#'+hashname, 'count': 10}, function(error, response, body){
        res.status(404).send({
            "error" : error
        });
    }, function(data){
        res.send({
            result : {
                "hashData" : data
            }
        });
    });
});




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

// app.all("/api/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     return next();
// });
