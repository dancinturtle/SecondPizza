var users = require('../controllers/users.js');

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

    // From Business site to update donation
    app.post('/donation/:charity/:amount', function(req, res){

        console.log("posted: ", req.params.charity, req.params.amount);
        // users.finddonations(req, res)
        res.json({'success': 'added'});

    });

    app.get('/donation/:charity/:amount', function(req, res){

        console.log("getted: ", req.params.charity, req.params.amount);
        res.json({'success': 'added'});
        // users.finddonations(req, res)
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
