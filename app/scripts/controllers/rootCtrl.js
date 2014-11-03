'use strict';

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
    .controller('rootCtrl', function ($scope, $rootScope, $interval, $window, $sce) {

        $scope.activeTimer = 'Count Up';

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

    });
