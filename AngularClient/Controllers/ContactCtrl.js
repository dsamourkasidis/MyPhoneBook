PhoneBookapp.controller('ContactCtrl', ['$scope', '$location', 'ContactService', '$window', '$filter', function ($scope, $location, ContactService, $window, $filter) {
    $scope.contacts = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.authdata = ContactService.localauth();
    $scope.edit = true;
    $scope.added = '';
    //Show myContacts if LoggedIn
    $scope.fillcontacts = function () {
        if (!$scope.authdata) {
                $location.path('/Login');         
        } else {
            ContactService.getContacts()
                .then(function (r) {
                    $scope.contacts = r.data;
                    $scope.getpage();
                });
        }
    }
    $scope.fillcontacts();

    //Edit a contact
    $scope.editok = function (newcontact, contact) {
        newcontact.ContactId = contact.ContactId;
        newcontact.UserId = contact.UserId;
        newcontact.$$hashKey = contact.$$hashKey;
        if (!angular.equals(newcontact,contact)) {
            ContactService.edit(newcontact)
            .then(function () {
                $scope.fillcontacts();
            });
        }
    }
    $scope.editcancel = function (newcontact, contact) {
        newcontact = contact;
        $scope.fillcontacts();
    }

    //Delete a Contact
    $scope.delete = function (contact) {
        if ($window.confirm("Are you sure you want to delete " + contact.LastName + "?? He's a nice guy...")) {
            ContactService.delete(contact.ContactId)
            .then(function (r) {
                ContactService.getContacts()
                    .then(function (r) {
                        $scope.fillcontacts();
                    });
            })
        }
    }

    //Add a Contact
    $scope.add = function () {
        ContactService.add($scope.newcontact)
         .then(function (response) {
             $scope.added = response.data.LastName + " successfully added!";
             ContactService.getContacts()
                 .then(function (r) {
                     $scope.fillcontacts();
                 });
         })
    };

    //Alphabet filter
    $scope.letter = {};
    $scope.letter.LastName = '';
    $scope.setletter = function (l) {
        $scope.letter.LastName = l;
        $scope.getpage();
    }

    $scope.letterfilter = function (input, input2) {
        if (input2 === '') return true;
        else {
            return (input[0] === input2) || (input[0] ===input2.toLowerCase()) ? true : false;
        }
    }

    //Pagination and search box filter
    $scope.getpage = function () {
        var begin = (($scope.currentPage - 1) * $scope.pageSize);
        var end = begin + $scope.pageSize;
        $scope.filteredcontacts1 = $filter('orderBy')($scope.contacts, 'LastName');
        $scope.filteredcontacts1 = $filter('filter')($scope.filteredcontacts1, { LastName: $scope.letter.LastName }, $scope.letterfilter);
        $scope.filteredcontacts = $filter('filter')($scope.filteredcontacts1, $scope.search);
        $scope.filteredcontacts = $scope.filteredcontacts.slice(begin, end);
    }
    
    $scope.pageChanged = function () {
        $scope.currentPage = 1;
        $scope.getpage();
    }
}])