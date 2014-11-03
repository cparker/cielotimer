'use strict';

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
    .controller('timerCtrl', function ($scope, $rootScope, $interval, $window, $sce, dataService) {

        $scope.startingMS = 0;
        $scope.currentTimerMS = 0;
        $scope.currentTimerString = '00:00.0';
        $scope.timerState = '';
        $rootScope.dataService = dataService;

        $scope.updateCountup = function () {
            $scope.currentTimerMS += 100;
            $scope.currentTimerString = moment($scope.currentTimerMS).format('mm:ss.S');
        };

        $scope.startCountup = function () {
            if ($scope.timerState == 'prestart') {
                $scope.timerState = 'running';
                $scope.startingMS = 0;
                $scope.currentTimerMS = 0;
                $scope.currentTimerString = moment($scope.currentTimerMS).format('mm:ss.S');
                $scope.interval = $interval($scope.updateCountup, 100);
            } else {
                $scope.timerState = 'prestart';
                $scope.startingMS = dataService.preStartCountdownSeconds * 1000;
                $scope.currentTimerMS = $scope.startingMS;
                $scope.currentTimerString = moment($scope.currentTimerMS).format('s');
                $scope.prestartDoneCB = $scope.startCountup;
                $scope.interval = $interval($scope.updatePreStartCountdown, 100);
            }
        };

        $scope.stopCountup = function () {
            $scope.timerState = 'paused';
            $interval.cancel($scope.interval);
        };

        $scope.beginPreStartCountdown = function () {
            $scope.startingMS = dataService.preStartCountdownSeconds * 1000;
            $scope.currentTimerMS = $scope.startingMS;
        };

        $scope.updatePreStartCountdown = function () {
            $scope.currentTimerMS -= 100;
            $scope.currentTimerString = moment($scope.currentTimerMS).format('s');
            if ($scope.currentTimerMS <= 0) {
                $interval.cancel($scope.interval);
                $scope.prestartDoneCB();
            }
        };

        $scope.$watch('currentTimerMS', function (oldVal, newVal) {
            if ($scope.currentTimerMS == 0) {
                return false;
            }

            if ($scope.currentTimerMS % 1000 == 0) {
                $rootScope.coverGreen = true;
                console.log('green');
            } else if ($scope.currentTimerMS % 900 == 0) {
                $rootScope.coverFadeout = true;
                console.log('fade');
            } else if ($scope.currentTimerMS % 100 == 0) {
                $rootScope.coverFadeout = false;
                $rootScope.coverGreen = false;
            }
        });

    });
