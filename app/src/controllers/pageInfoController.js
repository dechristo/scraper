const pageInfoService = require('../services/pageInfoService')

const getPageInfo = (url) => {
    console.log('--->', url);
    return pageInfoService.getPageInformation(url);
};

module.exports = {
    getPageInfo
}