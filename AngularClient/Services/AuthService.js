PhoneBookapp.factory('AuthService', ['$http', 'localStorageService',function ($http, localStorageService) {
    var baseurl = 'https://localhost:44355';
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
            localStorageService.set('authtoken', { token: r.access_token});
            localStorageService.set('authuser', { userName: user.email });
            _authentication.isAuth = true;
            _authentication.userName = user.email;
        });
        return promise;
    };

    //Logout by removing the token from localstorage
        var _Logout = function () {
            localStorageService.remove('authtoken');
            localStorageService.remove('authuser');
            _authentication.isAuth = false;
            _authentication.userName = "";
        };


    //Delete all contacts of loggedin member
        var _DeleteAccountContacts = function () {
            return $http({
                method: 'DELETE',
                url: baseurl + '/api/Contacts/',
                headers: { Authorization: 'Bearer ' + localStorageService.get('authtoken').token }
            });
        }

    //Delete an Account
        var _DeleteAccount = function () {
            return $http({
                method: 'DELETE',
                url: baseurl + '/api/Account/DeleteUser',
                headers: { Authorization: 'Bearer ' + localStorageService.get('authtoken').token }
            })
        }

    //Google Login
    //Get Account info
        var _info = function (access_token) {
            var promise = $http({
                method: 'GET',
                url: baseurl + '/api/Account/UserInfo',
                headers: { Authorization: 'Bearer ' + access_token }
            });
            promise.then(function (r) {
                if (r.data.HasRegistered == true) {
                    localStorageService.set('authuser', { userName: r.data.Email })
                    _authentication.userName = r.data.Email;
                    localStorageService.set('authtoken', { token: access_token });
                    _authentication.isAuth = true;
                }
                });
            return promise;
        }
    //RegisterExternalAccount
        var _registerexternal = function (email,Authorization) {
            var promise =  $http({
                method: 'POST',
                url: baseurl + '/api/Account/RegisterExternal',
                headers: { Authorization: Authorization },
                data : {Email : email}
            });
            promise.then(function (r) {

            });
            return promise;
        }

        var _fillauth = function () {
            var authdata = localStorageService.get('authtoken');
            if (authdata) {
                _authentication.isAuth = true;
                _authentication.userName =  localStorageService.get('authuser').userName;
            }
        };
        authServiceFactory.DeleteAccountContacts = _DeleteAccountContacts;
        authServiceFactory.DeleteAccount = _DeleteAccount;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.Logout = _Logout;
        authServiceFactory.Login = _Login;
        authServiceFactory.Register = _Register;
        authServiceFactory.info = _info;
        authServiceFactory.registerexternal = _registerexternal;
        authServiceFactory.fillauth = _fillauth;
        return authServiceFactory;
}]);