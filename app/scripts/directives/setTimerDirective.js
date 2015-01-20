'use strict';

angular.module('cielotimerApp')
    .directive('setTime', ['$interval', '$timeout', 'dataService', function ($interval, $timeout, dataService) {


        var link = function (scope, element, attrs) {

            scope.hours = scope.hours || 0;
            scope.minutes = scope.minutes || 0;
            scope.seconds = scope.seconds || 0;
            scope.totalDurationSeconds = scope.totalDurationSeconds || 0;

            scope.upHours = function () {
                scope.hours += 1;
                scope.totalDurationSeconds += 60 * 60;
            };

            scope.downHours = function () {
                scope.hours = Math.max(0, scope.hours - 1);
                scope.totalDurationSeconds = Math.max(0, scope.totalDurationSeconds - 60 * 60);
            };

            scope.upMinutes = function (n) {
                scope.minutes += n || 1;
                scope.totalDurationSeconds += 60 * (n || 1);
            };

            scope.downMinutes = function (n) {
                scope.minutes = Math.max(0, scope.minutes - (n || 1));
                scope.totalDurationSeconds = Math.max(0, scope.totalDurationSeconds - 60 * (n || 1));
            };

            scope.upSeconds = function (n) {
                scope.seconds += n || 1;
                scope.totalDurationSeconds += (n || 1);
            };

            scope.downSeconds = function (n) {
                scope.seconds = Math.max(0, scope.seconds - (n || 1));
                scope.totalDurationSeconds = Math.max(0, scope.totalDurationSeconds - (n || 1));
            };

            scope.$watch('totalDurationSeconds', function(newVal, oldVal) {
              dataService.countDownSeconds = newVal;
            });

        };

        return {
            templateUrl: 'views/setTimeControls.html',
            restrict: 'AEC',
            link: link
        };

    }]);
