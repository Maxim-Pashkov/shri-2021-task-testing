describe('cart test', function() {
    it('empty test', () => {});
    
    it('cart processing', async function() {
        await this.browser.url('/hw/store/catalog');

        const link = await this.browser.$('.card-link');
        await link.waitForExist();
        await link.click();

        const button = await this.browser.$('.Product button');
        await button.waitForExist();
        await button.click();

        try {
            await this.browser.url('/hw/store/cart');

            const cartTable = await this.browser.$('.Cart-Table');
            await cartTable.waitForExist();

            const checkoutButton = await this.browser.$('.Form-Submit');
            await checkoutButton.click();

            const feedback = await this.browser.$('.invalid-feedback');
            await feedback.waitForDisplayed();

            const nameInput = await this.browser.$('#f-name')
            await nameInput.setValue('test name');

            const phoneInput = await this.browser.$('#f-phone')
            await phoneInput.setValue('1231233123');

            const addressInput = await this.browser.$('#f-address')
            await addressInput.setValue('test address');

            await checkoutButton.click();

            const alertSuccess = await this.browser.$('.alert-success');
            await alertSuccess.waitForDisplayed();
        } finally {
            await this.browser.execute('localStorage.clear()');
        }      
    });
});