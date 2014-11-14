'use strict';

describe('scratchController', function () {

    // load the controller's module
    beforeEach(module('cieloScratch'));
    beforeEach(module('karmaTemplates'));

    var scope;

    var html = '<div set-time></div>';
    var element;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element(html);
        $compile(element)(scope);
        scope.$digest();
    }));

    it('values should get correctly initialized', function () {
        expect(scope.hours).toBe(0);
        expect(scope.minutes).toBe(0);
        expect(scope.seconds).toBe(0);
        expect(scope.totalDurationSeconds).toBe(0);
    });

    it('should correctly increment / decrement hours', function () {
        scope.upHours();
        expect(scope.totalDurationSeconds).toBe(60 * 60);
        scope.upHours();
        expect(scope.totalDurationSeconds).toBe(60 * 60 * 2);

        scope.downHours();
        expect(scope.totalDurationSeconds).toBe(60 * 60);
        scope.downHours();
        expect(scope.totalDurationSeconds).toBe(0);
        scope.downHours();
        expect(scope.totalDurationSeconds).toBe(0);
    });

    it('should correctly increment / decrement minutes', function () {
        scope.upMinutes();
        expect(scope.totalDurationSeconds).toBe(60);
        scope.upMinutes();
        expect(scope.totalDurationSeconds).toBe(60*2);

        scope.downMinutes();
        expect(scope.totalDurationSeconds).toBe(60);
        scope.downMinutes();
        expect(scope.totalDurationSeconds).toBe(0);
        scope.downMinutes();
        expect(scope.totalDurationSeconds).toBe(0);

        scope.upMinutes(10);
        expect(scope.totalDurationSeconds).toBe(60*10);

        scope.downMinutes(10);
        expect(scope.totalDurationSeconds).toBe(0);
    });

    it('should correctly increment / decrement seconds', function() {
        scope.upSeconds();
        expect(scope.totalDurationSeconds).toBe(1);
        scope.upSeconds();
        expect(scope.totalDurationSeconds).toBe(2);

        scope.downSeconds();
        expect(scope.totalDurationSeconds).toBe(1);
        scope.downSeconds();
        expect(scope.totalDurationSeconds).toBe(0);
        scope.downSeconds();
        expect(scope.totalDurationSeconds).toBe(0);

        scope.upSeconds(10);
        expect(scope.totalDurationSeconds).toBe(10);
        scope.downSeconds(10);
        expect(scope.totalDurationSeconds).toBe(0);
    });


});
