donationApp.factory('userFactory', function($http){
    // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
    var users;

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
            callback(output);
        });
    }

    // get specific donation
    factory.getdonation = function(donation_id, callback){
        $http.get('/business/'+ donation_id).success(function(output){
            callback(output);
        });
    }

    return factory;
});
