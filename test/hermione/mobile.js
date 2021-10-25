async function mobile(browser, fn) {
    const {width, height} = await browser.getWindowSize();   
    await browser.setWindowSize(520, height);
    try {
        await fn(browser);
    } finally {
        await browser.setWindowSize(width, height);
    }   
}

exports.mobile = mobile;