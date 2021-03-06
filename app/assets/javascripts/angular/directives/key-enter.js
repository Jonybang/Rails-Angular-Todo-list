/**
 * Created by jonybang on 10.08.15.
 */
angular.module('app').directive('keyEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.keyEnter);
                });

                event.preventDefault();
            }
        });
    };
});