donationApp.factory('loginFactory', function($http){
 // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
  var factory = {};
  allUsers = [];

  factory.getAllUsers = function(callback){
     $http.post('/getAllUsers').success(function(res){
       allUsers = res;
       callback(allUsers);
     })
   }
// factory.getCategory = function(callback){
//   callback(categories)
// }
//
// factory.add = function(data, callback){
//   $http.post('/add', data).success(function(output){
//     console.log(output);
//     callback(output);
//   });
// }


  return factory;
});
