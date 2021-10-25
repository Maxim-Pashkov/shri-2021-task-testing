async function mobile(browser, fn) {
    const {width, height} = await browser.getWindowSize();   
    await browser.setWindowSize(520, height);
    await fn(browser);
    await browser.setWindowSize(width, height);
}

exports.mobile = mobile;