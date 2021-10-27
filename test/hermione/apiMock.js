const { products, product } = require("../data.js");

exports.productsMock = async function productsMock(browser) {
    const dataMock = await browser.mock('**' + '/api/products', {
        method: 'get'
    });

    const response = products();

    dataMock.respond(response, {
        fetchResponse: false,
    });

    return response;
};

exports.productMock = async function productMock(id, browser) {
    const dataMock = await browser.mock('**' + '/api/products/' + id, {
        method: 'get'
    });

    const response = product(id);

    dataMock.respond(response, {
        fetchResponse: false,
    });

    return response;    
}