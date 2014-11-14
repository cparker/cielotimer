'use strict';

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
    .controller('rootCtrl', function ($scope, $rootScope, $interval, $window, $sce, dataService, $location) {

        $rootScope.dataService = dataService;

        $scope.activeTimer = 'Count Up';

        $scope.$on('$routeChangeSuccess', function () {
            console.log($location.path());

            switch ($location.path()) {
                case '/countUp':
                    $scope.activeTimer = 'Count Up';
                    break;
                case '/countDown':
                    $scope.activeTimer = 'Count Down';
                    break;
                case'/tabata':
                    $scope.activeTimer = 'Tabata';
                    break;
                case '/interval':
                    $scope.activeTimer = 'Interval';
                    break;
            }
        });

        $rootScope.timerConfigActive = false;

        $scope.setTimer = function (t) {
            $scope.activeTimer = t;
        };

        $rootScope.toggleTimerConfig = function () {
            $rootScope.timerConfigActive = !$rootScope.timerConfigActive;
        };

        $scope.leftNavOpen = false;

        $scope.toggleBurger = function () {
            console.log('burger');
            $scope.leftNavOpen = !$scope.leftNavOpen;
        };

        $scope.startTimer = function () {
            $rootScope.$broadcast('startTimer');
        };

        $scope.stopTimer = function () {
            $rootScope.$broadcast('stopTimer');
        };

    });
