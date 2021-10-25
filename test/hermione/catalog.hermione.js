describe('catalog test', function() {
    it('cart saved in storage', async function() {
        await this.browser.url('/hw/store/catalog');

        const link = await this.browser.$('.card-link');
        await link.waitForExist();
        await link.click();

        const button = await this.browser.$('.Product button');
        await button.waitForExist();
        await button.click();

        const badge = await this.browser.$('.text-success');
        try {
            await badge.waitForExist(); 

            await this.browser.url('/hw/store/cart');

            const cartTable = await this.browser.$('.Cart-Table');
            await cartTable.waitForExist();
        } finally {
            await this.browser.execute('localStorage.clear()');
        }      
    });
});