PhoneBookapp.factory('AuthService', ['$http', 'localStorageService',function ($http, localStorageService) {
    var baseurl = 'http://localhost:56352';
    var authServiceFactory = {};
    var _authentication = {
        isAuth: false,
        userName: ""
    };

    //Register at POST /api/Account/Register
    var _Register = function (user) {
        var userdata = {
            'Email': user.email,
            'Password': user.pass,
            'ConfirmPassword': user.pass
        };
        return $http({
            method: 'POST',
            url: baseurl + '/api/Account/Register',
            data: userdata
        });
    };

    //Login and request a token at POST /Token 
    var _Login = function (user) {
        var data = "grant_type=password&username=" + user.email + "&password=" + user.pass;
        var promise = $http({
            method: 'POST',
            url: baseurl + '/Token',
            data: data,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        });
        promise.success(function (r) {
            localStorageService.set('authdata', { token: r.access_token, userName: user.email });
            _authentication.isAuth = true;
            _authentication.userName = user.email;
        });
        return promise;
    };

    //Logout by removing the token from localstorage
        var _Logout = function () {
            localStorageService.remove('authdata');
            _authentication.isAuth = false;
            _authentication.userName = "";
        };


    //Delete all contacts of loggedin member
        var _DeleteAccountContacts = function () {
            return $http({
                method: 'DELETE',
                url: baseurl + '/api/Contacts/',
                headers: { Authorization: 'Bearer ' + localStorageService.get('authdata').token }
            });
        }

    //Delete an Account
        var _DeleteAccount = function () {
            return $http({
                method: 'DELETE',
                url: baseurl + '/api/Account/DeleteUser',
                headers: { Authorization: 'Bearer ' + localStorageService.get('authdata').token }
            })
        }

        var _fillauth = function () {
            var authdata = localStorageService.get('authdata');
            if (authdata) {
                _authentication.isAuth = true;
                _authentication.userName = authdata.userName;
            }
        };
        authServiceFactory.DeleteAccountContacts = _DeleteAccountContacts;
        authServiceFactory.DeleteAccount = _DeleteAccount;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.Logout = _Logout;
        authServiceFactory.Login = _Login;
        authServiceFactory.Register = _Register;
        authServiceFactory.fillauth = _fillauth;
        return authServiceFactory;
}]);