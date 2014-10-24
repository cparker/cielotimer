'use strict';

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
    .controller('MainCtrl', function ($scope, $interval, $window, $sce) {

        $scope.loggit = function (t) {
            $scope.status += '\n\r' + t;
        };

        $scope.startUserMedia = function (stream) {
            var input = $scope.audio_context.createMediaStreamSource(stream);
            $scope.loggit('Media stream created.');

            //input.connect($scope.audio_context.destination);
            //$scope.loggit('Input connected to audio context destination.');

            $scope.recorder = new Recorder(input);
            $scope.loggit('Recorder initialised.');

            $scope.$apply();
        };

        $scope.audio_context = new AudioContext;

        $window.navigator.webkitGetUserMedia({audio: true}, $scope.startUserMedia, function (e) {
            $scope.loggit('no audio input : ' + e);
        });


        $scope.updateTime = function () {
            if ($scope.currentTimerMS > 0) {
                $scope.currentTimerMS -= 100;
                $scope.currentTimerString = moment($scope.currentTimerMS).format('mm:ss.S');
            }

            if ($scope.currentTimerMS == 0) {
                $interval.cancel($scope.interval);
                $scope.done = 'DING!';
                $scope.play();
            }
        };

        $scope.startCountdown = function () {
            $scope.startingMS = parseInt($scope.enteredSeconds) * 1000;
            $scope.currentTimerMS = $scope.startingMS;
            $scope.interval = $interval($scope.updateTime, 100);
        };

        $scope.recordCountdown = function () {
            $scope.countDown -= 1;
            $scope.recordCue = $scope.countDown;
            if ($scope.countDown == 0) {
                $scope.recordCue = 'SPEAK';
                $interval.cancel($scope.recordCountdownInterval);
                $scope.recorder.clear();
                $scope.recorder.record();
                $scope.loggit('starting record...');
            }
        };

        $scope.startRecord = function () {
            $scope.countDown = 3;
            $scope.recordCue = $scope.countDown;
            $scope.recordCountdownInterval = $interval($scope.recordCountdown, 1000);
        };

        $scope.stopRecord = function () {
            $scope.recordCue = '';
            $scope.recorder.stop();
            $scope.loggit('stopping record...');

        };

        $scope.play = function () {
            $scope.loggit('playing ...');
            $scope.recorder.exportWAV(function (blob) {
                console.log('got blob ' + blob);
                var reader = new FileReader();
                reader.onload = function (someevent) {
                    console.log('we have an array buf? ' + reader.result);

                    $scope.audio_context.decodeAudioData(reader.result, function (audioBuf) {
                        console.log('playback');
                        var source = $scope.audio_context.createBufferSource();
                        source.buffer = audioBuf;
                        source.connect($scope.audio_context.destination);
                        source.start(0);
                    });

                };
                reader.readAsArrayBuffer(blob);
            });
        };


    });
