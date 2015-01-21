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
                templateUrl: 'views/countUp.html'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/countUp', {
                templateUrl: 'views/countUp.html'
            })
            .when('/countDown', {
                templateUrl: 'views/countDown.html'
            })
            .when('/tabata', {
                templateUrl: 'views/tabata.html'
            })
            .when('/interval', {
                templateUrl: 'views/interval.html'
            })
            .when('/preferences', {
                templateUrl: 'views/prefs.html'
            })
            .when('/audio', {
                templateUrl: 'views/audio.html',
                controller: 'audioCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
