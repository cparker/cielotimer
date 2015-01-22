'use strict';

angular.module('cielotimerApp')
    .directive('setTime', ['$interval', '$timeout', 'timerService', function ($interval, $timeout, timerService) {


        var link = function (scope, element, attrs) {

            scope.hours = scope.hours || 0;
            scope.minutes = scope.minutes || 0;
            scope.seconds = scope.seconds || 0;
            timerService.configuredSeconds = timerService.configuredSeconds || 0;

            scope.upHours = function () {
                scope.hours += 1;
                timerService.configuredSeconds += 60 * 60;
            };

            scope.downHours = function () {
                scope.hours = Math.max(0, scope.hours - 1);
                timerService.configuredSeconds = Math.max(0, timerService.configuredSeconds - 60 * 60);
            };

            scope.upMinutes = function (n) {
                scope.minutes += n || 1;
                timerService.configuredSeconds += 60 * (n || 1);
            };

            scope.downMinutes = function (n) {
                scope.minutes = Math.max(0, scope.minutes - (n || 1));
                timerService.configuredSeconds = Math.max(0, timerService.configuredSeconds - 60 * (n || 1));
            };

            scope.upSeconds = function (n) {
                scope.seconds += n || 1;
                timerService.configuredSeconds += (n || 1);
            };

            scope.downSeconds = function (n) {
                scope.seconds = Math.max(0, scope.seconds - (n || 1));
                timerService.configuredSeconds = Math.max(0, timerService.configuredSeconds - (n || 1));
            };

            scope.$watch('timerService.configuredSeconds', function(newVal, oldVal) {
              timerService.timerMSValue = parseInt(newVal || 0) * 1000;
            });

        };

        return {
            templateUrl: 'views/setTimeControls.html',
            restrict: 'AEC',
            link: link
        };

    }]);
