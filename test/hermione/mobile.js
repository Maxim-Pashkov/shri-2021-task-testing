async function mobile(browser, fn) {
    const {width, height} = await browser.getWindowSize();   
    await browser.setWindowSize(520, Math.max(height, 1440));
    try {
        await fn(browser);
    } finally {
        await browser.setWindowSize(width, height);
    }   
}

exports.mobile = mobile;