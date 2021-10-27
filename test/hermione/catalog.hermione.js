const { products, product } = require("../data");

describe('catalog test', function() {
    it('check data on page', async function() {
        const dataMock = await this.browser.mock('**' + '/api/products', {
            method: 'get'
        });

        dataMock.respond(products(), {
            fetchResponse: false,
        });

        await this.browser.url('/hw/store/catalog');
        await this.browser.assertView('catalog', '.Catalog', {
            compositeImage: true,
        });
    });

    it('check data on page item', async function() {
        const dataMock = await this.browser.mock('**' + '/api/products/0', {
            method: 'get'
        });

        dataMock.respond(product(0), {
            fetchResponse: false,
        });

        await this.browser.url('/hw/store/catalog/0');
        await this.browser.assertView('product', '.Product', {
            compositeImage: true,
        });
    });

    it('check text success on page item', async function() {
        const dataMock = await this.browser.mock('**' + '/api/products/0', {
            method: 'get'
        });

        dataMock.respond(product(0), {
            fetchResponse: false,
        });

        await this.browser.url('/hw/store/catalog/0');

        const addToCart = async () => {
            const button = await this.browser.$('.ProductDetails-AddToCart');
            await button.waitForClickable();
            await button.click();
            await this.browser.execute((selector) => {
                document.querySelector(selector).blur();
            }, '.ProductDetails-AddToCart');
        };

        try {
            await addToCart();       

            await this.browser.assertView('one item in cart', '.Product', {
                compositeImage: true,
            });

            await addToCart();

            await this.browser.assertView('two items in cart', '.Product', {
                compositeImage: true,
            });
        } finally {
            await this.browser.execute('localStorage.clear()');
        }
        
    });
});