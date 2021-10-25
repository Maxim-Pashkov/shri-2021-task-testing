const { mobile } = require("./mobile");

describe('markup test', function() {
    async function navbar(browser) {
        await browser.url('/hw/store/');   
        await browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        }); 
    }

    it('navbar desktop', async function() {
        await navbar(this.browser);      
    });

    it('navbar mobile', async function() {
        await mobile(this.browser, navbar);         
    });

    it('navbar mobile opened', async function() {
        await mobile(this.browser, async () => {
            await this.browser.url('/hw/store/');
            const toggler = await this.browser.$('.navbar-toggler');
            await toggler.click();
            const nav = await this.browser.$('.navbar-nav');
            await nav.waitForDisplayed();
        });
    });

    it('navbar mobile closed after second click by toggler', async function() {
        await mobile(this.browser, async () => {
            await this.browser.url('/hw/store/');
            const toggler = await this.browser.$('.navbar-toggler');
            await toggler.click();
            await toggler.click();
            const nav = await this.browser.$('.navbar-nav');
            await nav.waitUntil(async function() {
                return await nav.isDisplayed() === false;
            }, {
                timeout: 5000,
                timeoutMsg: 'navbar is displayed after close',
            });
        });      
    });

    it('navbar mobile closed after click by link', async function() {
        await mobile(this.browser, async () => {
            await this.browser.url('/hw/store/');
            const toggler = await this.browser.$('.navbar-toggler');
            await toggler.click();
            const link = await this.browser.$('.nav-link');
            await link.click();
            const nav = await this.browser.$('.navbar-nav');
            await nav.waitUntil(async function() {
                return await nav.isDisplayed() === false;
            }, {
                timeout: 5000,
                timeoutMsg: 'navbar is displayed after close',
            });
        });         
    });
});