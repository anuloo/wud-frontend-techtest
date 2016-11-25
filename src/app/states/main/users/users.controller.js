(function () {
  'use strict';

  angular
    .module('wud.techtest')
    .controller('UsersController', UsersController);
   
  /** @ngInject */
  function UsersController($scope, $http) {
    $http.get('http://localhost:8000/users').success(function(response){
        $scope.users = response
        $scope.user = "";
    });
  }
})();
