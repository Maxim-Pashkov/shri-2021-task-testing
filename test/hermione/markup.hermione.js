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
});