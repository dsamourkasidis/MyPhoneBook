var PhoneBookapp = angular.module('PhoneBookapp', ['ngRoute', 'LocalStorageModule','ui.bootstrap']);

PhoneBookapp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/Views/Home.html',
        controller: 'HomeCtrl'
    })
    .when('/Register', {
        templateUrl: '/Views/Register.html',
        controller: 'RegisterCtrl'
    })
    .when('/Login', {
        templateUrl: '/Views/Login.html',
        controller: 'LoginCtrl'
    })
    .when('/Contacts', {
        templateUrl: '/Views/Contacts.html',
        controller: 'ContactCtrl'
    })
            .when('/callback', {
                templateUrl: '/Views/callback.html',
                controller: 'callbackCtrl'
            })
    .otherwise({
        redirectTo: '/'
    });
    
});

PhoneBookapp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('PhoneBookapp')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
});

PhoneBookapp.run(['AuthService', function (AuthService) {
    AuthService.fillauth();
}]);