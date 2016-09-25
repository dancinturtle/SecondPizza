donationApp.controller('businessCtrl', function ($scope, $routeParams, userFactory, $location) {

  $scope.business_info;
  $scope.business_id = $routeParams.id;
  console.log("business id", $scope.business_id);

  userFactory.getTweets(function(data){
    $scope.tweets = data;
    console.log("Got my tweets", $scope.tweets);
  })


  userFactory.getdonations($scope.business_id, function(data){

      console.log('adadaddad', data);
      $scope.business_info = data;
  })


});
