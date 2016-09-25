donationApp.factory('userFactory', function($http){
    // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
    var users;
    var factory = {};

    // get users
    factory.getUsers = function(callback){
        $http.post('/getUsers').success(function(output){
            callback(output);
        });
    }

    // add user
    factory.add = function(data, callback){

        console.log('data: ', data);
        $http.post('/create', data).success(function(output){
            callback(output);
        });
    }


    return factory;
});
