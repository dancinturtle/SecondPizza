var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);


app.listen(8000, function() {
  console.log("Listening on Port 8000");
})
