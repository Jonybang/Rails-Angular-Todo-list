// Force reload ui-router state:
// Example:
// $state.forceReload();
// http://stackoverflow.com/a/23198743/6053486

angular.module('app')
    .config(['$provide', function($provide) {
        $provide.decorator('$state', ['$delegate', '$stateParams', function($delegate, $stateParams) {
            $delegate.forceReload = function() {
                return $delegate.go($delegate.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            };
            return $delegate;
        }]);
    }]);