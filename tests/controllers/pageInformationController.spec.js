const expect = require('chai').expect;
const sinon = require('sinon');

const PageInfoController = require('../../app/src/controllers/pageInformationController');
const PageInformationService = require('./../../app/src/services/pageInformationService');

describe('Page Info Controller', () => {
	it('GET /scrap/analize/:url should return json data for valid url', async () => {
		sinon.stub(PageInformationService.prototype, 'getPageInformation')

		let res = PageInfoController.getPageInformation();

		expect(res).to.not.be.null;
	});	
});		

//https://stackoverflow.com/questions/14487809/how-to-mock-request-and-response-in-nodejs-to-test-middleware-controllers