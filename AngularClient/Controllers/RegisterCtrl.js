PhoneBookapp.controller('RegisterCtrl', ['$scope', 'AuthService', '$timeout', '$location', function ($scope, AuthService, $timeout, $location) {
    $scope.reg = false;
    $scope.regi = false;
    $scope.Reg = function(){
        AuthService.Register($scope.user)
        .then(function (data) {
            $scope.reg = "Successfully registered! Now redirecting to login page...";
            $timeout(function () {
                $location.path('/Login');
            }, 5000);
        }, function (response) {
            if(response.data.ModelState[""]){
                $scope.regi = response.data.ModelState[""][0];
            } else if (response.data.ModelState['model.Password'][0]) {
                $scope.regi = response.data.ModelState['model.Password'][0];
            }
        });
    }
}])