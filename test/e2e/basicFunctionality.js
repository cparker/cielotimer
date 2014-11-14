describe('The cielo timer', function () {

    it('should have the right title', function () {
        browser.get('http://localhost:9001');
        expect(browser.getTitle()).toEqual('cielotimer');
    });

    it('should load with the Count Up timer active', function () {
        browser.get('http://localhost:9001');
        var e = $('body > main > div > header > div.topBanner');
        expect(e.getText()).toEqual('Count Up');
    });

    it('the burger should open the side nav', function () {
        $('body > main > div > div.centerContainer > nav').getCssValue('width').then(function (w) {
            console.log('WIDTH IS');
            console.log(w);
        });

        // menu should be closed
        expect($('body > main > div > div.centerContainer > nav').getCssValue('width')).toBe('0px');

        // click the burger
        $('body > main > div > header > div.burger').click();

        // menu should be open
        expect($('body > main > div > div.centerContainer > nav').getCssValue('width')).toNotBe('0px');
    });

    it('the active timer in the menu bar should change as the left nav items are selected', function () {
        $('body > main > div > div.centerContainer > nav > ng-include > ul > li:nth-child(1) > a').click();
        expect($('body > main > div > header > div.topBanner').getText()).toEqual('Count Up');

        $('body > main > div > div.centerContainer > nav > ng-include > ul > li:nth-child(2) > a').click();
        expect($('body > main > div > header > div.topBanner').getText()).toEqual('Count Down');

        $('body > main > div > div.centerContainer > nav > ng-include > ul > li:nth-child(3) > a').click();
        expect($('body > main > div > header > div.topBanner').getText()).toEqual('Tabata');

        $('body > main > div > div.centerContainer > nav > ng-include > ul > li:nth-child(4) > a').click();
        expect($('body > main > div > header > div.topBanner').getText()).toEqual('Interval');
    });

});