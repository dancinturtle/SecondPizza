donationApp.factory('donationFactory', function($http){
 // var categories = [{name:'array'}, {name: 'string'}, {name:'binary search tree' }, {name:'singly link list' }];
  var factory = {};
  var charities = [];
// factory.getCategory = function(callback){
//   callback(categories)
// }

factory.getCharities = function(callback){
  $http.get('/charities').success(function(res){
    charities = res;
    callback(charities);
  })
}//closes index

factory.newDonation = function(donation, callback){
  $http.post('/newDonation', donation).success(function(res){
    callback(res);
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
