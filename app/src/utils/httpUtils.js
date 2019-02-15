const request = require('request');

const doGetRequest = (url) => {
    return new Promise((resolve, reject) => {
        request.get(url, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
};

module.exports = {
    doGetRequest
};