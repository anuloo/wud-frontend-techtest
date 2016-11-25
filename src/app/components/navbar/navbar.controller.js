(function () {
    'use strict';

    angular
        .module('wud.techtest')
        .controller('NavBarController', NavBarController);

    /** @ngInject */
    function NavBarController($scope, $state) {
        var states = $state.get();
        $scope.states = [];
        angular.forEach(states, function (value, key) {
            // This condition makes sure we only get the main navigation states pushed in the $scope.states
            if (value.name != "" && value.name != states[1].name && value.name != 'main.add-user') {
                var title = generateNavTitle(value.name);
                var state = {name:value.name, title: title};
                $scope.states.push(state);
                console.log('state tile: ' + state.title);
            }
        });
        // We need to generate the navbar menu title from the state.names
        function generateNavTitle(string) {
            var startIndex = string.indexOf(".") + 1;
            var title = string.substring(startIndex);
            return title.substr(0, 1).toUpperCase() + title.substr(1);
        }


    }
})();