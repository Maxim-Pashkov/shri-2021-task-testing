describe('pages url test', function() {
    async function mobile(browser, fn) {
        const {width, height} = await browser.getWindowSize();   
        await browser.setWindowSize(520, height);
        await fn(browser);
        await browser.setWindowSize(width, height);
    }

    async function home(browser) {
        await browser.url('/hw/store/');
        const content = await browser.$('.Home');
        await content.waitForExist();
        await content.scrollIntoView();           
        await browser.assertView('plain', '.Home', {
            compositeImage: true,
        });     
    }

    it('Home', async function() {
        await home(this.browser);        
    });

    it('Home mobile', async function() {
        await mobile(this.browser, home);       
    });

    async function delivery(browser) {
        await browser.url('/hw/store/delivery');
        const content = await browser.$('.Delivery');
        await content.waitForExist();
        await content.scrollIntoView();
        await browser.assertView('plain', '.Delivery', {
            compositeImage: true,
        });       
    }

    it('Delivery', async function() {
        await delivery(this.browser);
    });

    it('Delivery mobile', async function() {
        await mobile(this.browser, delivery);
    });   

    async function contacts(browser) {
        await browser.url('/hw/store/contacts');
        const content = await browser.$('.Contacts');
        await content.waitForExist();
        await content.scrollIntoView();
        await browser.assertView('plain', '.Contacts', {
            compositeImage: true,
        });        
    }

    it('Contacts', async function() {
        await contacts(this.browser);     
    });

    it('Contacts mobile', async function() {
        await mobile(this.browser, contacts);    
    });

    async function cart(browser) {
        await browser.url('/hw/store/cart');
        const content = await browser.$('.Cart');
        await content.waitForExist();
        await content.scrollIntoView();
        await browser.assertView('plain', '.Cart', {
            compositeImage: true,
        });        
    }

    it('Cart', async function() {
        await cart(this.browser);  
    });

    it('Cart mobile', async function() {
        await mobile(this.browser, cart);  
    });
});