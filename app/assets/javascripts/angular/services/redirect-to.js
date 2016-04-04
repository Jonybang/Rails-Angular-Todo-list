// Redirect to ui-router state
// Example:
// $stateProvider
//    .state('main', {
//        url: '/main',
//        templateUrl: 'main.html',
//        redirectTo: 'main.street',
//    })
// http://stackoverflow.com/a/29491412/6053486

angular.module('app')
    .run(['$rootScope', '$state', function($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });
    }]);