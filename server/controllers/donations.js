var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "8889",
    password: "root",
    database: "pizzaforhomes"
})

module.exports = (function(){
    return {
        // Create new user/business
        create: function(req, res){
            var newuser = {name: req.body.name, password: req.body.password, store_number: req.body.store_id, created_at: new Date(), updated_at: new Date()};

            con.query('INSERT INTO users SET ?', newuser, function(err, result){
                if(err){
                    res.json(err);
                }
                else {
                    res.json(result);
                }
            });
        },

        // Get all users/businesses
        index: function(req, res){
            con.query('SELECT * FROM users', function(err, rows){
                if(err){
                    res.json(err);
                }
                else {
                  res.json(rows);
                }
            });
        },

        finddonations: function(req, res){
          con.query('SELECT users.name, donations.donationscol, donations.total_amount, donations.amount_left, donations.expiration_date, charities.name AS charity FROM users JOIN donations ON users.id = donations.user_id JOIN charities ON donations.charity_id = charities.id;', function(err, rows){
            if(err){
              res.json(err)
            }
            else {
              res.json(rows);
            }
          });
        }
    }

})();
