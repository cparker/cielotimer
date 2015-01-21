'use strict';

angular.module('cielotimerApp')
  .factory('timerService', ['$http', function () {


    return {
      countdownSeconds: 3,
      timerMSValue: 0,
      timerString: '00:00.0'
    };

  }]);
