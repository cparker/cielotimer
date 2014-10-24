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
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
