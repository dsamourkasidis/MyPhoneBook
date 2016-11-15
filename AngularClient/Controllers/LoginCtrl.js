PhoneBookapp.controller('LoginCtrl', ['$scope', 'AuthService', '$location', '$window', '$timeout',
    function ($scope, AuthService, $location, $window, $timeout)
    {
        $scope.log = false;
        $scope.status = false;
    //Login
    $scope.Logn = function () {
        AuthService.Login($scope.user)
        .then(function (response) {
            $location.path('/Contacts');
        }, function (response) {
            $scope.log = response.data.error_description;
        });
    };

    //Google Login
    $scope.google = function () {
        window.$windowScope = $scope;
        var externalProviderUrl = "https://localhost:44355/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=phonebook&redirect_uri=http%3A%2F%2Flocalhost%3A54330%2FViews%2Fcallback.html";
        var oauthWindow = $window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    //Check if already registered with Google
    $scope.callback = function (fragment) {
        AuthService.info(fragment['access_token'])
        .then(function (r) {
            if (r.data.HasRegistered === false) {
                AuthService.registerexternal(r.data.Email,r.config.headers.Authorization)
                .then(function (r) {
                    $scope.status = "Successfully registered with Google! Now you can Sign In ";
                });
            } else {
                $scope.status = "Successfully logged in with Google! Now redirecting to contacts...";
                $timeout(function () {
                    $location.path('/Contacts');
                }, 3000);
            }
        });
    }
}])