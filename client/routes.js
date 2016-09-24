donationApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/login.html'
    })
    .when('/dashboard',{
        templateUrl: 'partials/dashboard.html'
    })
    .when('/donation',{
        templateUrl: 'partials/donation.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
