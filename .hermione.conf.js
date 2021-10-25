module.exports = {
    baseUrl: 'http://localhost:3000',
    retry: 2,
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
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report',
        }
    }
};