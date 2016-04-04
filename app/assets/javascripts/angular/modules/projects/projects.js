'use strict';

angular.module('app.projects', ['ui.router'])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {


    $stateProvider
        .state('app.projects', {
            url: '/projects/',
            controller: 'ProjectsIndexCtrl',
            templateUrl: 'angular/modules/projects/templates/index.html',
            abstract: true
        })
        .state('app.projects.not_select', {
            url: '',
            templateUrl: 'angular/modules/projects/templates/not_select.html'
        })
        .state('app.projects.show', {
            url: ':projectId/',
            controller: 'ProjectsShowCtrl',
            templateUrl: 'angular/modules/projects/templates/show.html',
            abstract: true
        })
        .state('app.projects.show.tasks', {
            url: '',
            controller: 'ProjectsTasksCtrl',
            templateUrl: 'angular/modules/projects/templates/tasks.html'
        })
        .state('app.projects.show.settings', {
            url: 'settings',
            controller: 'ProjectsSettingsCtrl',
            templateUrl: 'angular/modules/projects/templates/settings.html'
        });
    }]);