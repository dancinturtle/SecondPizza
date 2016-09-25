donationApp.controller('dashboardCtrl', function ($scope, $routeParams, $location, dashboardFactory) {
  dashboardFactory.index(function(data){
    $scope.companies = data;

  })


});
