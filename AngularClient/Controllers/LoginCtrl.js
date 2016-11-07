PhoneBookapp.controller('LoginCtrl', ['$scope', 'AuthService', '$location', function ($scope, AuthService,$location) {
    $scope.log = false;
    //Login
    $scope.Logn = function () {
        AuthService.Login($scope.user)
        .then(function (response) {
            $location.path('/Contacts');
        }, function (response) {
            $scope.log = response.data.error_description;
        });
    };

}])