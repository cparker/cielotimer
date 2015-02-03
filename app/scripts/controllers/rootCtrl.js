'use strict';

/**
 * @ngdoc function
 * @name cielotimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cielotimerApp
 */
angular.module('cielotimerApp')
  .controller('rootCtrl', ['$scope', '$rootScope', '$interval', '$window', '$sce', 'dataService', 'timerService', '$location',
    function ($scope, $rootScope, $interval, $window, $sce, dataService, timerService, $location) {

      var timerStateInit = 'init';
      var timerStateCountdown = 'countdown';
      var timerStateRunning = 'running';
      var timerStateCountdownPaused = 'countdownPaused';
      var timerStateRunningPaused = 'runningPaused';
      var timerStateFinished = 'done';

      var leftButtonStartLabel = 'START';
      var leftButtonResumeLabel = 'RESUME';
      var leftButtonPauseLabel = 'PAUSE';
      var rightButtonResetLabel = 'RESET';

      var timerIncrementMS = 100;
      var countdownIncrement = 1000;

      var timerVariationCountUp = 'countUp';
      var timerVariationCountDown = 'countDown';
      var timerVariationTabata = 'tabata';

      var countdownFormat = 's';


      $scope.init = function () {
        console.log('rootCtrl init');

        $scope.timerVariation = timerVariationCountUp;

        $scope.timerState = timerStateInit;
        $scope.leftButtonLabel = leftButtonStartLabel;
        $scope.rightButtonLabel = rightButtonResetLabel;

        $scope.timerFormat = 'mm:ss.S';
        $scope.countdownFormat = 's';

        $scope.dataService = dataService;
        $scope.timerService = timerService;

        timerService.timerMSValue = 0;
        timerService.timerString = '00:00.0';

        $scope.activeTimer = 'Count Up';

        $scope.timerConfigActive = false;

        $scope.leftNavOpen = false;
        $scope.rightSliderOpen = false;
      };


      $scope.handleLeftButton = function () {

        if ($scope.timerState === timerStateInit) {
          $scope.timerState = timerStateCountdown;
        }
        else if ($scope.timerState === timerStateCountdown) {
          $scope.timerState = timerStateCountdownPaused;
        }
        else if ($scope.timerState === timerStateRunning) {
          $scope.timerState = timerStateRunningPaused;
        }
        else if ($scope.timerState === timerStateRunningPaused) {
          $scope.timerState = timerStateRunning;
        }
        else if ($scope.timerState === timerStateCountdownPaused) {
          $scope.timerState = timerStateCountdown;
        }
      };


      $scope.handleRightButton = function () {
        if ($scope.timerState === timerStateCountdownPaused || $scope.timerState === timerStateRunningPaused) {
          $scope.timerState = timerStateInit;
        }
      };

      $scope.$watch('timerState', function (newVal, oldVal) {
        // INIT -> COUNTDOWN
        if (oldVal === timerStateInit && newVal === timerStateCountdown) {
          console.log('starting timer countdown');
          timerService.timerMSValue = timerService.countdownSeconds * countdownIncrement;
          $scope.leftButtonLabel = leftButtonPauseLabel;
          $scope.startCountdown();
        }
        // COUNTDOWN -> RUNNING
        else if (oldVal === timerStateCountdown && newVal === timerStateRunning) {
          console.log('starting timer running');
          $scope.leftButtonLabel = leftButtonPauseLabel;
          $scope.startRunning();
        }
        // RUNNING -> RUNNING PAUSED
        else if (oldVal === timerStateRunning && newVal === timerStateRunningPaused) {
          console.log('pausing running timer');
          $scope.leftButtonLabel = leftButtonResumeLabel;
          $scope.pauseRunning();
        }
        // COUNTDOWN -> COUNTDOWN PAUSED
        else if (oldVal === timerStateCountdown && newVal === timerStateCountdownPaused) {
          console.log('pausing countdown timer');
          $scope.leftButtonLabel = leftButtonResumeLabel;
          $scope.pauseCountdown();
        }
        // COUNTDOWN PAUSED || RUNNING PAUSED -> INIT
        else if ((oldVal === timerStateCountdownPaused || oldVal === timerStateRunningPaused) && newVal === timerStateInit) {
          console.log('resetting paused timer back to init');
          $scope.leftButtonLabel = leftButtonStartLabel;
          $scope.resetTimer();
        }
        // COUNTDOWN PAUSED -> COUNTDOWN
        else if (oldVal === timerStateCountdownPaused && newVal === timerStateCountdown) {
          console.log('resuming paused countdown timer to running');
          $scope.leftButtonLabel = leftButtonPauseLabel;
          $scope.resumeCountdown();
        }
        // RUNNING PAUSED -> RUNNING
        else if (oldVal === timerStateRunningPaused && newVal === timerStateRunning) {
          console.log('resuming paused running timer to running');
          $scope.leftButtonLabel = leftButtonPauseLabel;
          $scope.resumeRunning();
        }
        // RUNNING -> FINISHED
        else if (oldVal === timerStateRunning && newVal === timerStateFinished) {
          console.log('timer finished');
          // todo : alert
          $scope.timerState = timerStateInit;
          $scope.leftButtonLabel = leftButtonStartLabel;
        }

      });


      $scope.startCountdown = function () {
        console.log('starting timer interval');
        $scope.timerInterval = $interval($scope.handleTimerTick, countdownIncrement);
      };

      $scope.startRunning = function () {
        $scope.cancelTimerInterval();
        if ($scope.timerVariation === timerVariationCountUp) {
          timerService.timerMSValue = 0;
          $scope.timerInterval = $interval($scope.handleTimerTick, timerIncrementMS);
        }

        else if ($scope.timerVariation === timerVariationCountDown && $scope.timerService.configuredSeconds) {
          $scope.timerService.timerMSValue = timerService.configuredSeconds * 1000;
          $scope.timerInterval = $interval($scope.handleTimerTick, timerIncrementMS);
        }

      };

      $scope.pauseRunning = function () {
        $scope.cancelTimerInterval();
      };

      $scope.pauseCountdown = function () {
        $scope.cancelTimerInterval();
      };

      $scope.resumeRunning = function () {
        $scope.timerInterval = $interval($scope.handleTimerTick, timerIncrementMS);
      };

      $scope.resumeCountdown = function () {
        $scope.timerInterval = $interval($scope.handleTimerTick, countdownIncrement);
      };

      $scope.resetTimer = function () {
        timerService.timerMSValue = 0;
      };

      $scope.handleTimerTick = function () {

        // countdown
        if ($scope.timerState === timerStateCountdown) {
          $scope.countdownHandleTick();
        } else {

          // timers

          // UP
          if ($scope.timerVariation === timerVariationCountUp) {
            $scope.upTimerHandleTick();
          }
          // DOWN
          else if ($scope.timerVariation === timerVariationCountDown) {
            $scope.downTimerHandleTick();
          }
          // TABATA

          // INTERVAL
        }
      };

      $scope.upTimerHandleTick = function () {
        timerService.timerMSValue += 100;
      };

      $scope.downTimerHandleTick = function () {
        if (timerService.timerMSValue > 0) {
          timerService.timerMSValue -= 100;
        } else {
          $scope.cancelTimerInterval();
          $scope.timerState = timerStateFinished;
        }
      };

      // 3...2...1....go!
      $scope.countdownHandleTick = function () {
        if (timerService.timerMSValue > 0) {
          // the countdown interval is 1 second
          timerService.timerMSValue -= countdownIncrement;
        } else {
          $scope.cancelTimerInterval();
          $scope.timerState = timerStateRunning;
        }
      };


      $scope.cancelTimerInterval = function () {
        $interval.cancel($scope.timerInterval);
      };


      $scope.$on('$routeChangeSuccess', function () {
        console.log($location.path());

        switch ($location.path()) {
          case '/countUp':
            $scope.activeTimer = 'Count Up';
            $scope.timerVariation = timerVariationCountUp;
            break;
          case '/countDown':
            $scope.activeTimer = 'Count Down';
            $scope.timerVariation = timerVariationCountDown;
            break;
          case'/tabata':
            $scope.activeTimer = 'Tabata';
            $scope.timerVariation = timerVariationTabata;
            break;
          case '/interval':
            $scope.activeTimer = 'Interval';
            break;
        }
      });

      $scope.$watch('timerService.timerMSValue', function (oldVal, newVal) {
        if ($scope.timerState === timerStateCountdown) {
          $scope.timerService.timerString = moment($scope.timerService.timerMSValue).format(countdownFormat);
        } else {
          $scope.timerService.timerString = moment($scope.timerService.timerMSValue).format($scope.timerFormat);
        }

      });


      $scope.setTimer = function (t) {
        $scope.activeTimer = t;
      };

      $scope.toggleTimerConfig = function () {
        $scope.timerConfigActive = !$scope.timerConfigActive;
      };


      $scope.toggleBurger = function () {
        $scope.leftNavOpen = !$scope.leftNavOpen;
      };

      $scope.toggleTimerOptions = function () {
        $scope.rightSliderOpen = !$scope.rightSliderOpen;
      };

      $scope.startTimer = function () {
        $scope.$broadcast('startTimer');
      };

      $scope.stopTimer = function () {
        $scope.$broadcast('stopTimer');
      };


      //$scope.currentTimerString = moment($scope.currentTimerMS).format($scope.timerFormat);

      $scope.init();

    }]);
