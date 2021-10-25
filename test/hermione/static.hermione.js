describe('pages url test', function() {
    it('Home', async function() {
        await this.browser.url('/hw/store/');
        const content = await this.browser.$('.Home');
        await content.waitForExist();   
        await content.scrollIntoView();        
        await this.browser.assertView('plain', '.Home', {
            compositeImage: true,
        });            
    });

    it('Delivery', async function() {
        await this.browser.url('/hw/store/delivery');
        const content = await this.browser.$('.Delivery');
        await content.waitForExist();
        await content.scrollIntoView();
        await this.browser.assertView('plain', '.Delivery', {
            compositeImage: true,
        });       
    });

    it('Contacts', async function() {
        await this.browser.url('/hw/store/contacts');
        const content = await this.browser.$('.Contacts');
        await content.waitForExist();
        await content.scrollIntoView();
        await this.browser.assertView('plain', '.Contacts', {
            compositeImage: true,
        });        
    });

    it('Cart', async function() {
        await this.browser.url('/hw/store/cart');
        const content = await this.browser.$('.Cart');
        await content.waitForExist();
        await content.scrollIntoView();
        await this.browser.assertView('plain', '.Cart', {
            compositeImage: true,
        });        
    });
});