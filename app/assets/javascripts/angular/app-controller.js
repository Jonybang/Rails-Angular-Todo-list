/**
 * Created by jonybang on 10.07.15.
 */
angular.module('app').controller('AppCtrl', ['$scope', '$state',
    function($scope, $state) {

        // Полезные переменные и методы:
        // $state.current.name - Полное имя текущего роута, например 'app.projects'
        // $state.go('app.projects', {projectId: 1}); - Перейти к указанному роуту с параметрами
        // $state.params.projectId - Получить параметр из роута
        // $state.forceReload(); - Перезагрузить роут, доступен благодаря /services/force-reload.js
    }]);