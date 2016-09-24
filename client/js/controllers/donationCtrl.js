donationApp.controller('donationCtrl', function ($scope, donationFactory, businessFactory) {

    businessFactory.getUsers(function(data){
        $scope.categories = data;
        console.log(data);
  });


});
