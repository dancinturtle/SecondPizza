var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "8889",
    password: "root",
    database: "pizzaforhomes"
})

// var Employee = mysql.model('Employee');

module.exports = (function(){
    return {
        // Create new user/business
        create: function(req, res){

            console.log("Posted", req.body);

            var newuser = {name: req.body.name, password: req.body.password, store_id: req.body.store_id, created_at: new Date(), updated_at: new Date()};

            con.query('INSERT INTO users SET ?', newuser, function(err, result){
                if(err){
                    res.json(err);
                }
                else {
                    res.json(result);
                }
            })



            //   console.log("Posted", req.body);
            //   var newuser = {first_name: req.body.firstname, last_name: req.body.lastname, username: req.body.username, email: req.body.email, password: req.body.password, salt: req.body.salt, phone: req.body.phone, home_lat: req.body.home_lat, home_long: req.body.home_long, image_path: req.body.image_path, visiting_lat: req.body.visiting_lat, visiting_long: req.body.visiting_long, created_at: new Date(), updated_at: new Date()};
            //   con.query('INSERT INTO users SET ?', newuser, function(err, result){
            //     if(err){
            //       res.json(err);
            //     }
            //     else {
            //       res.json(result);
            //     }
            //   })
        },

        // Get all users/businesses
        index: function(req, res){
            con.query('SELECT * FROM users', function(err, rows){
                if(err){
                    res.json(err);
                };

                res.json(rows);
            })
        }
    }

})();
