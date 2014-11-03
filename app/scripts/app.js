'use strict';

/**
 * @ngdoc overview
 * @name cielotimerApp
 * @description
 * # cielotimerApp
 *
 * Main module of the application.
 */
angular
    .module('cielotimerApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider, $sceProvider) {
        $sceProvider.enabled(false);

        $routeProvider
            .when('/', {
                templateUrl: 'views/countUp.html',
                controller: 'timerCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/countUp', {
                templateUrl: 'views/countUp.html',
                controller: 'timerCtrl'
            })
            .when('/countDown', {
                templateUrl: 'views/countDown.html',
                controller: 'timerCtrl'
            })
            .when('/tabata', {
                templateUrl: 'views/tabata.html',
                controller: 'timerCtrl'
            })
            .when('/interval', {
                templateUrl: 'views/interval.html',
                controller: 'timerCtrl'
            })
            .when('/preferences', {
                templateUrl: 'views/prefs.html',
                controller: 'timerCtrl'
            })
            .when('/audio', {
                templateUrl: 'views/audio.html',
                controller: 'audioCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
