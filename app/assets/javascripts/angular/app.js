/**
 * Created by jonybang on 03.07.15.
 */
'use strict';

var app = angular.module('app', [
    'app.projects',
    //'app.tasks',

    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ui.router',
    'ui.router.tabs',
    'ui.select',

    //drag and drop
    'dndLists',
    //format datetime and etc.
    'angularMoment',
    //notifications(http://ned.im/noty/) service
    'noty',
    'rt.debounce',

    //output html markup and etc.
    'ngSanitize',

    //Rails templates(https://github.com/pitr/angular-rails-templates)
    'templates',
    //railsResourceFactory(https://github.com/FineLinePrototyping/angularjs-rails-resource)
    'rails',
    //send csrf token with requests
    'ng-rails-csrf'
]);


app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider',
            'railsSerializerProvider', 'RailsResourceProvider',
            'showErrorsConfigProvider', 'uiSelectConfig', function($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider, railsSerializerProvider, RailsResourceProvider, showErrorsConfigProvider, uiSelectConfig) {

        //Если какойто неизвестный URL, то перенаправляем на начальную страницу
        $urlRouterProvider.otherwise("/manager");

        //Конфиг routes для angular
        $stateProvider
                .state('app', {
                    url: '/manager',
                    controller: 'AppCtrl',
                    templateUrl: 'angular/templates/index.html',
                    redirectTo: 'app.projects.not_select'
                });

        //Ссылки без #
        $locationProvider.html5Mode(true);

        //Кроме подсветки ошибок показываем подстветку того что все ок
        showErrorsConfigProvider.showSuccess(true);

        //Устанавливаем глобально тему bootstrap для ui-select
        uiSelectConfig.theme = 'bootstrap';

        //В список обработчиков при http запросах добавляем сервис из /services/loading.js
        //С помощью /services/noty.js отображает сообщения о загрузке, не найденных данных или ошибке севера
        //Для /services/noty.js нужен animate.css, иначе сообщения не будут закрываться
        $httpProvider.interceptors.push('loadingInterceptor');

        //Отключение перевода underscore в camelize для RailsResource
        railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
    }]);

app.run(['amMoment', '$rootScope', '$state', function(amMoment, $state) {

        amMoment.changeLocale('ru');

    }]);