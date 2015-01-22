'use strict';
/* global Recorder:false */
/* global AudioContext:false */
/* global webkitAudioContext:false */
/* global moment:false */

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
  .controller('audioCtrl', function ($scope, $interval, $window) {

    $scope.init = function () {
      console.log('audioCtrl init');
      $scope.recording = false;
      $scope.result = 'init';
    };

    $scope.play = function () {
      var player = new Media('documents://foo.wav',
        function () {

        },
        function (err) {

        });

      player.play();

    };

    $scope.record = function () {
      if (!$scope.recording) {
        console.log('start recording');
        $scope.recording = true;
        try {
          $scope.mediaRec = new Media('documents://foo.wav',
            function () {
              console.log('record success');
              $scope.result = 'record success';
            },
            function (err) {
              console.log('record fail', err);
              $scope.result = 'record fail ' + err;
            });

          $scope.result = 'before call to start';
          $scope.mediaRec.startRecord();
        } catch (err) {
          console.log('caught exception ', err);
          $scope.result = 'caught exception ' + err;
        }


      } else {
        console.log('stop recording');
        $scope.recording = false;
        $scope.result = 'before call to stop';
        $scope.mediaRec.stopRecord();
      }

    };

    $scope.init();

  });
