/**
 * Created by jonybang on 19.09.15.
 */
angular.module('app').directive('deleteObject', ['$noty', '$timeout', function($noty, $timeout) {
    return {
        restrict: 'A',
        scope: {
            deleteObject: '=',
            deleteSuccess: '&',
            customDelete: '&'
        },
        link: function ($scope, $element, $attrs){
            $element.click(function(){
                if(!$scope.deleteObject || !$scope.deleteObject.id)
                    return;

                $noty.dialog({text:'Вы действительно хотите удалить объект "' + $scope.deleteObject.name + '"?'}).then(function(){
                    var objPromise;
                    if('customDelete' in $attrs)
                        objPromise = $scope.customDelete();
                    else
                        objPromise = $scope.deleteObject.delete();

                    objPromise.then(function(){
                        $noty.message({text:'Объект "' + $scope.deleteObject.name + '" успешно удален.'});
                        $timeout($scope.deleteSuccess);
                    });
                })
            });
        }
    };
}]);