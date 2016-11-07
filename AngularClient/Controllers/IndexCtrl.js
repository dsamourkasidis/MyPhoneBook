PhoneBookapp.controller('IndexCtrl', ['$scope', 'AuthService', '$location', '$timeout','$window', function ($scope, AuthService, $location, $timeout, $window) {
    $scope.del = false;
    $scope.log = AuthService.authentication;

    //Logout
    $scope.Logout = function () {
        $scope.del = false;
        AuthService.Logout();
        $location.path('/');
    }

    //Delete Account and associated contacts
    $scope.Delete = function () {
        if ($window.confirm('Delete your account and all of your contacts??')) {
            AuthService.DeleteAccountContacts()
            .then(function (response) {
                AuthService.DeleteAccount()
                .then(function (response2) {
                    $scope.del = "Successfully deleted your account! Now redirecting to home page...";
                    $timeout(function () {
                        $scope.Logout();
                    }, 5000);
                })
            })
        }
    }
}])