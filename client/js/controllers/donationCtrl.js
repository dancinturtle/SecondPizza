donationApp.controller('donationCtrl', function ($scope, donationFactory, userFactory) {
    userFactory.getUsers(function(data){
        $scope.categories = data;
        console.log(data);
  });


});
