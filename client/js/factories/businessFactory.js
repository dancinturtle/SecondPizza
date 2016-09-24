donationApp.factory('businessFactory', function($http){
    // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
    var users;
    var factory = {};

    factory.getUsers = function(callback){
        $http.post('/getUsers').success(function(output){
            console.log(output);
            callback(output);
        });
    }
    //
    // factory.add = function(data, callback){
    //   $http.post('/add', data).success(function(output){
    //     console.log(output);
    //     callback(output);
    //   });
    // }


    return factory;
});
