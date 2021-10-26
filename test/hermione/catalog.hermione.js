const { productsMock, productMock } = require("./apiMock");

describe('catalog test', function() {
    it('check data on page', async function() {
        await productsMock(this.browser);

        await this.browser.url('/hw/store/catalog');
        await this.browser.assertView('catalog', '.Catalog', {
            compositeImage: true,
        });
    });

    it('check data on page item', async function() {
        await productMock(0, this.browser);

        await this.browser.url('/hw/store/catalog/0');
        await this.browser.assertView('product', '.Product', {
            compositeImage: true,
        });
    });

    it('check text success on page', async function() {
        const products = await productsMock(this.browser);

        const product = products[0];

        await productMock(product.id, this.browser);

        await this.browser.url('/hw/store/catalog/' + product.id);

        try {
            await addToCart(this.browser);    
            
            await this.browser.url('/hw/store/catalog/');

            await this.browser.assertView('item in cart', `.ProductItem[data-testid="${product.id}"]`, {
                compositeImage: true,
            });
        } finally {
            await this.browser.execute('localStorage.clear()');
        }        
    });

    it('check text success on page item', async function() {
        await productMock(0, this.browser);

        await this.browser.url('/hw/store/catalog/0');

        try {
            await addToCart(this.browser);       

            await this.browser.assertView('one item in cart', '.Product', {
                compositeImage: true,
            });

            await addToCart(this.browser);

            await this.browser.assertView('two items in cart', '.Product', {
                compositeImage: true,
            });
        } finally {
            await this.browser.execute('localStorage.clear()');
        }
        
    });

    async function addToCart(browser) {
        const button = await browser.$('.ProductDetails-AddToCart');
        await button.waitForClickable();
        await button.click();
        await browser.execute((selector) => {
            document.querySelector(selector).blur();
        }, '.ProductDetails-AddToCart');
        await new Promise(resolve => setTimeout(resolve, 200));
    }
});