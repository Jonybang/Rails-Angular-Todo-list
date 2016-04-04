/**
 * Created by jonybang on 12.08.15.
 */
'use strict';

var app = angular.module('app.projects');

app.controller('ProjectsIndexCtrl', ['$scope', '$state', 'Project', function($scope, $state, Project) {
    Project.get().then(function(projects){
        $scope.projects = projects;

        if(!$scope.cur_project_id)
          $scope.getCurProjectFromState();
    });

    $scope.getCurProjectFromState = function(){
        $scope.cur_project_id = $state.params.projectId;
    };

    $scope.getCurProjectFromState();

    $scope.addProject = function(){
        new Project({name: $scope.new_project}).create().then(function(project){
            $scope.projects.push(project);
            $scope.new_project = '';
            $state.go('app.projects.show.tasks', {projectId: project.id})
        });
    }
}]);

app.controller('ProjectsShowCtrl', ['$scope', '$state', 'Project', function($scope, $state, Project) {
    $scope.$parent.getCurProjectFromState();

    Project.get($state.params.projectId).then(function(project){
        $scope.project = project;
    });

    $scope.tabData = [
        {
            heading: 'Задачи',
            route:   'app.projects.show.tasks'
        },
        {
            heading: 'Настройки',
            route:   'app.projects.show.settings'
        }
    ];
}]);

app.controller('ProjectsTasksCtrl', ['$scope', '$state', 'Project', 'Task', function($scope, $state, Project, Task) {
    //$scope.project берется из родительского Scope($scope.$parent)
    $scope.addTask = function(){
        $scope.project.AddTask({name: $scope.new_task}, true);
        $scope.new_task = '';
    };

    $scope.changeTask = function(task){
        task.update();
        task.edit = false;
    };

    $scope.taskMoved = function(index){
        $scope.project.tasks.splice(index, 1);

        $scope.project.tasks.forEach(function(task, idx){
            task.index = idx;
            new Task(task).update().then(function(new_task){
                $scope.project.tasks[idx] = new_task;
            });
        });
    };
}]);

app.controller('ProjectsSettingsCtrl', ['$scope', '$state', 'Project', 'Helpers', function($scope, $state, Project, Helpers) {
    //$scope.project берется из родительского Scope($scope.$parent)
    $scope.saveProject = function (){
        $scope.project.update();
        $state.go('app.projects.show.tasks');
    };

    $scope.projectDeleted = function(){
        Helpers.deleteById($scope.projects, $scope.project.id);
        $state.go('app.projects.not_select');
    };
}]);