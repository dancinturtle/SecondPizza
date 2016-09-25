var users = require('../controllers/users.js');
var charities = require('../controllers/charities.js');

module.exports = function(app){

    // Get all users/businesses
    app.post('/getUsers', function(req, res){
        console.log("Getting users");
        users.index(req, res)
    });

    // Add new user/business
    app.post('/create', function(req, res){
        users.create(req, res)
    });

    app.get('/companies', function(req, res){
        users.finddonations(req, res)
    });
    app.get('/charities', function(req, res){
        charities.getAll(req, res)
    });

    app.post('/newDonation', function(req, res){
      charities.newDonation(req, res)
    });

    // From Business site to update donation
    app.post('/donation/:charity_id/:amount', function(req, res){
        console.log("DONATION: to charity with ID " + req.params.charity_id + " AMOUNT " + req.params.amount);
        console.log("HI AMYYYYY - BHARGIIII");

        users.updatedonation(req, res);
    });


    // From Business site to update donation
    app.get('/donation/:charity_id/:amount', function(req, res){
        console.log("DONATION: to charity with ID " + req.params.charity_id + " AMOUNT " + req.params.amount);
        console.log("HI AMYYYYY - BHARGIIII");

        users.updatedonation(req, res);
    });

    // Get charity/donation progress
    app.get('/business/:charity_id/', function(req, res){
        console.log("GETTING donation information");
        users.getdonation(req, res);
    });



  // app.get('/users/getall', function(req, res){
  //   console.log("Getting stuff");
  //   users.index(req, res)
  // });

  // app.post('/adduser', function(req, res){
  //   console.log("Routes,", req);
  //   users.create(req, res);
  // });




}
