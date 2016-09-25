donationApp.controller('dashboardCtrl', function ($scope, $routeParams, $location, dashboardFactory) {
  dashboardFactory.index(function(data){
    $scope.companies = data;
    for (var i=0; i<$scope.companies.length; i++){
        var date = new Date($scope.companies[i].expiration_date);
        $scope.companies[i].expiration_date = date.toDateString();
      }

    })

  });
