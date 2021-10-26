const { products, product } = require("../data.js");

async function productsMock(browser) {
    const dataMock = await browser.mock('**' + '/api/products', {
        method: 'get'
    });

    const response = products();

    dataMock.respond(response, {
        fetchResponse: false,
    });

    return response;
};

async function productMock(id, browser) {
    const dataMock = await browser.mock('**' + '/api/products/' + id, {
        method: 'get'
    });

    const response = product(id);

    dataMock.respond(response, {
        fetchResponse: false,
    });

    return response;    
}

async function checkoutMock(browser) {
    const dataMock = await browser.mock('**' + '/api/checkout', {
        method: 'post'
    });

    const response = {id: 1};

    dataMock.respond(response, {
        fetchResponse: false,
    });

    return response;    
}

module.exports = {checkoutMock, productMock, productsMock};