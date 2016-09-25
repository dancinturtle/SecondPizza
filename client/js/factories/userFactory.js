donationApp.factory('userFactory', function($http, $location){
    // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
    var users;
    var loggedInUser;
    var factory = {};

    // get users
    factory.getAllUsers = function(callback){
        $http.get('/getAllUsers').success(function(output){
            console.log("factory all users", output);
            callback(output);
        });
    }

    // add user
    factory.add = function(data, callback){
        $http.post('/create', data).success(function(output){
            loggedInUser = output;
            $location.path('/business/'+output);

        });
    }

    // get all donations by a certain user
    factory.getdonations = function(business_id, callback){
        $http.get('/business/' + business_id).success(function(output){
          console.log("factory output", output);
            callback(output);
        });
    }

    factory.rememberUser = function(data, callback){
      loggedInUser = data;
      console.log("Factory's logged in", loggedInUser);
      callback(loggedInUser);
    }

    return factory;
});
