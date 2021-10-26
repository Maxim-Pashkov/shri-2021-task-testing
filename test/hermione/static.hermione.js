const { mobile } = require("./mobile");

describe('pages url test', function() {
    async function home(browser) {
        await browser.url('/hw/store/');
        await browser.assertView('plain', '.row', {
            compositeImage: true,
            screenshotDelay: 200,
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
        await browser.assertView('plain', '.Delivery', {
            compositeImage: true,
            screenshotDelay: 200,
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
        await browser.assertView('plain', '.Contacts', {
            compositeImage: true,
            screenshotDelay: 200,
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
        await browser.assertView('plain', '.Cart', {
            compositeImage: true,
            screenshotDelay: 200,
        });        
    }

    it('Cart', async function() {
        await cart(this.browser);  
    });

    it('Cart mobile', async function() {
        await mobile(this.browser, cart);  
    });
});