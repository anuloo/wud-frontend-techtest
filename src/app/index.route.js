(function() {
  'use strict';

  angular
    .module('wud.techtest')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/states/main/main.html'
      })
      .state('main.home', {
        url: '/',
        templateUrl: 'app/states/main/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('main.users', {
        url: '/users',
        templateUrl: 'app/states/main/users/users.html',
        controller: 'UsersController',
        controllerAs: 'users'
      })
      // dummy test navigation states
      .state('main.about', {
        url: '/navtest1',
      })
      .state('main.contact', {
        url: '/navtest1',
      })
      .state('main.help', {
        url: '/navtest1',
      })
      // this should not been here its a substate of the users
      .state('main.add-user', {
        url: '/add-user',
        templateUrl: 'app/states/main/users/add-user.html',
        controller: 'AddNewUserController',
        controllerAs: 'add-user'
      });

     $urlRouterProvider.otherwise('/');
  }

})();
