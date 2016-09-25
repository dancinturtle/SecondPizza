var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "8889",
    password: "root",
    database: "pizzaforhomes"
});


module.exports = (function(){
    return {
        // Create new user/business
        getAll: function(req, res){
          con.query('SELECT * FROM charities', function(err, rows){
              if(err){
                  res.json(err);
              }
              else {
                res.json(rows);
              }
          });
        },

        newDonation: function(req, res){
            var newdonation = {donationscol: req.body.desc, user_id: req.body.user_id, charity_id: req.body.charity.id, total_amount: req.body.amount, amount_left: req.body.amount, hashtag: req.body.hashtag, expiration_date: req.body.expiration, created_at: new Date(), updated_at: new Date()};

            con.query('INSERT INTO donations SET ?', newdonation, function(err, result){
                if(err){
                    res.json(err);
                }
                else {
                    res.json(result);
                }
            });
        }


  }
})();
