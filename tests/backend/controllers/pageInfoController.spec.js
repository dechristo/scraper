const expect = require('chai').expect;
const nock = require('nock');
const pageInfoController = require('../../../app/src/controllers/pageInfoController');
const http_mocks = require('node-mocks-http')
const should = require('should')

describe('Page Info Controller', function() {
  
	it('GET /scrap/analize/:url should return page info for valid url', function(done){
		let response = http_mocks.createResponse({eventEmitter : require('events').EventEmitter});
		let request  = http_mocks.createRequest({
			method: 'GET',
			url: 'http://localhost:2000/scrap/analize/',
			params: {
				url: 'https://www.bookdepository.com'
			}
		});	
		
		pageInfoController.getPageInfo(request, response);
		
		response
			.on('end', function() {
				let data = JSON.parse(response._getData());
		    	expect(data).to.have.property('title');
		    	expect(data.title).to.be.equal('\n\tBook Depository: Millions of books with free delivery worldwide');
		    	expect(data).to.have.property('htmlVersion');
		    	expect(data).to.have.property('headings');
		    	expect(data.headings).to.be.an('array');
		    	expect(data).to.have.property('hasLoginForm');
		    	done();
			})		  			
	})	
	
	it('GET /scrap/analize/:url should return error for invalid url', function(done){
		let response = http_mocks.createResponse();
		let request  = http_mocks.createRequest({
			method: 'GET',
			url: 'http://localhost:2000/scrap/analize/',
			params: {
				url: 'httpsaaj82us://ww.ertrerekdekingtory.c3om'
			}
		});	
		
		pageInfoController.getPageInfo(request, response);
		
		
		let data = JSON.parse(response._getData());
		expect(data).to.have.property('error');
		done();
				  			
	})	
});		

