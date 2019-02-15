const PageInformationService = require('../services/pageInformationService')

class PageInformationController {

    static async getPageInformation(req, res) {
        const url = req.params.url;
        const service = new PageInformationService();
        const info = await service.getPageInformation(url);
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.status(200).json(info);
    }
}

module.exports = PageInformationController;