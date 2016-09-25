donationApp.controller('businessCtrl', function ($scope, $routeParams, userFactory, $location) {

  $scope.business_info;
  $scope.business_id = $routeParams.id;
  console.log("business id", $scope.business_id);

  $scope.mstohuman = function(date){
    var diff = new Date(date) - new Date();
    var hours = 0;
    var days = 0;
    var weeks = 0;
    var minutes = 0;
    diff = Math.floor(diff / 60000); //how many minutes ago
    while(diff >= 0){
      // if(5 > diff && diff >= 0){
      //   minutes = "Less than 5";
      //   diff = -1;
      // }
      if(60 > diff && diff >= 0){
        minutes = diff;
        diff=-1;
      }
      if(1440 > diff && diff >= 60){
          diff -= 60;
          hours ++;
      }
      if(10080 > diff && diff >= 1440){
        diff -= 1440;
        days ++;
      }
      if(diff >= 10080){
        diff -= 10080;
        weeks ++;
      }
    }
    return {weeks: weeks, days: days, hours: hours, minutes: minutes}
  }


  userFactory.getdonations($scope.business_id, function(data){

      console.log('adadaddad', data);
      $scope.business_info = data;
      for(var i=0;i<$scope.business_info.length; i++){
        var diff = $scope.mstohuman($scope.business_info[i].expiration_date);
        $scope.business_info[i].timeLeft = diff;
      }
  })


});
