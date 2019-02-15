var expect = require('chai').expect;
var pageInfoController = require('../../../app/src/controllers/pageInfoController');
var http_mocks = require('sinon');
var should = require('should');

describe('Page Info Controller', () => {
	it('GET /scrap/analize/:url should return page info for valid url', async () => {
		const url = 'https://www.bookdepository.com';
		result = await pageInfoController.getPageInfo(url);
		expect(result).to.not.be.null;		  			
		expect(result).to.haveOwnProperty('htmlVersion');
		expect(result).to.haveOwnProperty('title');
		expect(result).to.haveOwnProperty('headings');
		expect(result).to.haveOwnProperty('hasLoginForm');
		expect(result).to.haveOwnProperty('internalLinks');
		expect(result).to.haveOwnProperty('externalLinks');
	});	
	
	it('GET /scrap/analize/:url should return error for invalid url', async () =>{
		const url = 'https://www.bookdepositasdory.com';
		result = await pageInfoController.getPageInfo(url);
		expect(result).to.not.be.null;		  			
		expect(result).to.haveOwnProperty('error');
		expect(result.error).to.equal('Invalid or unreachable URL!');
	});
});		

