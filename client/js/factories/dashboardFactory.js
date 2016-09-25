donationApp.factory('dashboardFactory', function($http){
 // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
  var factory = {};
  var companies = [];
  factory.index = function(callback){
    $http.get('/companies').success(function(res){
      companies = res;
      callback(companies);
    })
  }//closes index

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
