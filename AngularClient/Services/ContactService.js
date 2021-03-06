﻿PhoneBookapp.service('ContactService', ['$http', 'localStorageService', 'AuthService', function ($http, localStorageService, AuthService) {
    var baseurl = 'https://localhost:44355';
    this.localauth = function () {
        return localStorageService.get('authtoken');
    }

    //GET all contacts from api/Contacts
    this.getContacts = function () {
        return $http({
            method: 'GET',
            url: baseurl + '/api/Contacts',
            headers: { Authorization: 'Bearer ' + this.localauth().token }
        });
    };

    //POST a new contact to api/Contacts
    this.add = function (con) {
        var data = {
            FirstName: con.fname,
            LastName: con.lname,
            PhoneNumber: con.pnumber,
            Address: con.address,
            Email: con.email
        }
        return $http({
            method: 'POST',
            url: baseurl + '/api/Contacts',
            headers: { Authorization: 'Bearer ' + this.localauth().token },
            data: data
        });
    };

    this.edit = function (con) {
        var data = {
            FirstName: con.FirstName,
            LastName: con.LastName,
            PhoneNumber: con.PhoneNumber,
            Address: con.Address,
            ContactId: con.ContactId,
            Email: con.Email
        }
        return $http({
            method: 'PUT',
            url: baseurl + '/api/Contacts/' + con.ContactId,
            headers: { Authorization: 'Bearer ' + this.localauth().token },
            data: data
        });
    };

    //DELETE a contact to api/Contacts
    this.delete = function (id) {
        return $http({
            method: 'DELETE',
            url: baseurl + '/api/Contacts/' + id,
            headers: { Authorization: 'Bearer ' + this.localauth().token }
        });
    };
}]);