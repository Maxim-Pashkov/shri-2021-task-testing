describe('markup test', function() {
    it('navbar desktop', async function() {
        await this.browser.url('/hw/store/');   
        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
        });            
    });

    it('navbar mobile', async function() {
        await this.browser.url('/hw/store/');  
        const {width, height} = await this.browser.getWindowSize();   
        await this.browser.setWindowSize(520, 480);
        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        });  
        await this.browser.setWindowSize(width, height);          
    });

    it('navbar mobile opened', async function() {
        await this.browser.url('/hw/store/');  
        const {width, height} = await this.browser.getWindowSize();   
        await this.browser.setWindowSize(520, 480);
        const toggler = await this.browser.$('.navbar-toggler');
        await toggler.click();
        const navBar = await this.browser.$('.navbar-nav');
        await navBar.waitForDisplayed();
        await this.browser.setWindowSize(width, height);
    });

    it('navbar mobile opened closed after second click by toggler', async function() {
        await this.browser.url('/hw/store/');  
        const {width, height} = await this.browser.getWindowSize();
        await this.browser.setWindowSize(520, 480);
        const toggler = await this.browser.$('.navbar-toggler');
        await toggler.click();
        await toggler.click();
        const navBar = await this.browser.$('.navbar-nav');
        await navBar.waitUntil(async function() {
            return await navBar.isDisplayed() === false;
        }, {
            timeout: 5000,
            timeoutMsg: 'navbar is displayed after close',
        });
        await this.browser.setWindowSize(width, height);          
    });

    it('navbar mobile closed after click by link', async function() {
        await this.browser.url('/hw/store/');  
        const {width, height} = await this.browser.getWindowSize();   
        await this.browser.setWindowSize(520, 480);
        const toggler = await this.browser.$('.navbar-toggler');
        await toggler.click();
        const link = await this.browser.$('.nav-link');
        await link.click();
        const navBar = await this.browser.$('.navbar-nav');
        await navBar.waitUntil(async function() {
            return await navBar.isDisplayed() === false;
        }, {
            timeout: 5000,
            timeoutMsg: 'navbar is displayed after close',
        });
        await this.browser.setWindowSize(width, height);          
    });
});