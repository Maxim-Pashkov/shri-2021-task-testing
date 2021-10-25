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
        this.browser.execute(() => document.querySelector('.navbar-toggler').blur());
        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        });  
        await this.browser.setWindowSize(width, height);          
    });

    it('navbar mobile closed after click', async function() {
        await this.browser.url('/hw/store/');  
        const {width, height} = await this.browser.getWindowSize();   
        await this.browser.setWindowSize(520, 480);
        const toggler = await this.browser.$('.navbar-toggler');
        await toggler.click();
        const link = await this.browser.$('.nav-link');
        await link.click();
        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        });  
        await this.browser.setWindowSize(width, height);          
    });
});