var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      port: "8889",
      password: "root",
      database: "pizzaforhomes"
  })

con.connect(function(err){
  if(err){
    console.log("Error connecting to the DB");
    return;
  }
  console.log("Connection established");
})

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});
