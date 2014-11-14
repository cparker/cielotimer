'use strict';
/*global moment:false */

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
    .controller('timerCtrl', function ($scope, $rootScope, $interval, $window, $sce, dataService, $location) {

        $scope.timerFormat = 'mm:ss.S';

        $scope.startingMS = 0;
        $scope.currentTimerMS = 0;
        $scope.currentTimerString = '00:00.0';
        $scope.timerState = '';

        $scope.$watch('dataService.countDownSeconds', function (newVal, oldVal) {
            console.log('countDown ' + newVal + ' ' + oldVal);
            if (newVal) {
                $scope.currentTimerMS = newVal * 1000;
                $scope.currentTimerString = moment($scope.currentTimerMS).format($scope.timerFormat);
            }
        });

        $scope.$on('startTimer', function () {
            console.log('received startTimer');
            $scope.startTimer();
        });

        $scope.$on('stopTimer', function () {
            $scope.stopTimer();
        });

        $scope.startTimer = function () {
            if ($scope.activeTimer === 'Count Up') {
                $scope.startCountup();
            }
            else if ($scope.activeTimer === 'Count Down') {
                $scope.startCountdown();
            }
        };

        $scope.stopTimer = function () {
            if ($scope.activeTimer === 'Count Up') {
                $scope.stopCountup();
            } else if ($scope.activeTimer === 'Count Down') {
                $scope.stopCountdown();
            }
        };

        $scope.updateCountup = function () {
            $scope.currentTimerMS += 100;
            $scope.currentTimerString = moment($scope.currentTimerMS).format($scope.timerFormat);
        };

        $scope.updateCountdown = function () {
            $scope.currentTimerMS -= 100;
            $scope.currentTimerString = moment($scope.currentTimerMS).format($scope.timerFormat);
        };

        $scope.startCountup = function () {
            if ($scope.timerState === 'prestart') {
                $scope.timerState = 'running';
                $scope.startingMS = 0;
                $scope.currentTimerMS = 0;
                $scope.currentTimerString = moment($scope.currentTimerMS).format($scope.timerFormat);
                $scope.interval = $interval($scope.updateCountup, 100);
            } else {
                $scope.timerState = 'prestart';
                $scope.prestartDoneCB = $scope.startCountup;
                $scope.doPrestart();
            }
        };

        $scope.doPrestart = function () {
            $scope.startingMS = dataService.preStartCountdownSeconds * 1000;
            $scope.currentTimerMS = $scope.startingMS;
            $scope.currentTimerString = moment($scope.currentTimerMS).format('s');
            $scope.interval = $interval($scope.updatePreStartCountdown, 100);
        };

        $scope.startCountdown = function () {
            if ($scope.timerState === 'prestart') {
                $scope.timerState = 'running';
                $scope.currentTimerMS = dataService.countDownSeconds * 1000;
                $scope.currentTimerString = moment($scope.currentTimerMS).format($scope.timerFormat);
                $scope.interval = $interval($scope.updateCountdown, 100);

            } else {
                $scope.timerState = 'prestart';
                $scope.prestartDoneCB = $scope.startCountdown;
                $scope.doPrestart();
            }

        };

        $scope.stop = function () {
            $scope.timerState = 'paused';
            $interval.cancel($scope.interval);
        };

        $scope.stopCountup = function () {
            $scope.stop();
        };

        $scope.stopCountdown = function () {
            $scope.stop();
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


    });
