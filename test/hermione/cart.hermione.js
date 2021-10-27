const { productMock } = require("./apiMock");

describe('cart test', function() {
    it('empty test', () => {});
    
    it('cart processing', async function() {
        await productMock(0, this.browser);
        await this.browser.url('/hw/store/catalog/0');

        const button = await this.browser.$('.Product button');
        await button.waitForClickable();
        await button.click();
        await button.click();

        try {
            await this.browser.url('/hw/store/cart');

            await this.browser.assertView('cart table', '.Cart-Table', {
                compositeImage: true,
            });

            await this.browser.assertView('form', '.Form', {
                compositeImage: true,
            });

            const checkoutButton = await this.browser.$('.Form-Submit');
            await checkoutButton.click();

            await this.browser.assertView('form invalid', '.Form', {
                compositeImage: true,
                screenshotDelay: 200,
            });

            const nameInput = await this.browser.$('#f-name')
            await nameInput.setValue('test name');

            const phoneInput = await this.browser.$('#f-phone')
            await phoneInput.setValue('1231233123');

            const addressInput = await this.browser.$('#f-address')
            await addressInput.setValue('test address');

            await checkoutButton.click();
            
            const successMessage = await this.browser.$('.Cart-SuccessMessage');
            await successMessage.waitForExist();

            await this.browser.assertView('success message', '.Cart-SuccessMessage', {
                compositeImage: true,                
            });
        } finally {
            await this.browser.execute('localStorage.clear()');
        }      
    });
});