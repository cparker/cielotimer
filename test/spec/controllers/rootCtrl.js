'use strict';

describe('Controller: rootCtrl', function () {

    // load the controller's module
    beforeEach(module('cielotimerApp'));

    var AboutCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AboutCtrl = $controller('rootCtrl', {
            $scope: scope
        });
    }));

    it('should set the active timer to Count Up', function () {
        expect(scope.activeTimer).toBe('Count Up');
    });

    it('the left nav should be closed', function() {
        expect(scope.leftNavOpen).toBe(false);
    });


});
