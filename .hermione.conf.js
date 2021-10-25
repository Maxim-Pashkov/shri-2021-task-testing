module.exports = {
    baseUrl: 'http://localhost:3000',
    sets: {
        common: {
            files: 'test/hermione'
        },
    },   

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
};