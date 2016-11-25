(function() {
  'use strict';

  angular
    .module('wud.techtest')
    .controller('AddNewUserController',AddNewUserController);

  
  function AddNewUserController($http, $scope, $location){
    $scope.addUser = function(){
      var data = {
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
      }

    $http.post('http://localhost:8000/user', data).success(function () {
          $location.path('/users')
      });
    }
  }
})();
