angular.module('cielotimerApp')
    .factory('dataService', ['$http', function ($http) {

        var theService = {

            preStartCountdownSeconds: 3

        };

        return theService;

    }]);
