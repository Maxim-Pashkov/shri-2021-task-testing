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

    it('check text success on page', async function() {
        const dataMock = await this.browser.mock('**' + '/api/products/', {
            method: 'get'
        });

        const productsItems = products();

        dataMock.respond(productsItems, {
            fetchResponse: false,
        });

        const productItem = productsItems[0];

        const dataItemMock = await this.browser.mock('**' + '/api/products/' + productItem.id, {
            method: 'get',
        });

        dataItemMock.respond(product(productItem.id), {
            fetchResponse: false,
        });

        await this.browser.url('/hw/store/catalog/' + productItem.id);

        try {
            await addToCart(this.browser);    
            
            await this.browser.url('/hw/store/catalog/');

            await this.browser.assertView('item in cart', `.ProductItem[data-testid="${productItem.id}"]`, {
                compositeImage: true,
            });
        } finally {
            await this.browser.execute('localStorage.clear()');
        }        
    });

    it('check text success on page item', async function() {
        const dataMock = await this.browser.mock('**' + '/api/products/0', {
            method: 'get'
        });

        dataMock.respond(product(0), {
            fetchResponse: false,
        });

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
        await new Promise(resolve => setTimeout(resolve, 100));
    }
});