'use strict';

angular.module('cielotimerApp')
    .factory('dataService', ['$http', function () {

        var theService = {

            preStartCountdownSeconds: 3

        };

        return theService;

    }]);
