var expect = require('chai').expect;
var nock = require('nock');
var pageInfoController = require('../../../app/src/controllers/pageInfoController');
var http_mocks = require('node-mocks-http');
var should = require('should');

describe('Page Info Controller', function() {
  
	it('GET /scrap/analize/:url should return page info for valid url', function(done){
		var response = http_mocks.createResponse({eventEmitter : require('events').EventEmitter});
		var request  = http_mocks.createRequest({
			method: 'GET',
			url: 'http://localhost:2000/scrap/analize/',
			params: {
				url: 'https://www.bookdepository.com'
			}
		});	
		
		pageInfoController.getPageInfo(request, response);
		
		response
			.on('end', function() {
				var data = JSON.parse(response._getData());
		    	expect(data).to.have.property('title');
		    	expect(data.title).to.be.equal('\n\tBook Depository: Millions of books with free delivery worldwide');
		    	expect(data).to.have.property('htmlVersion');
		    	expect(data.htmlVersion).to.be.equal('HTML 5');
		    	expect(data).to.have.property('headings');
		    	expect(data.headings).to.be.an('array');
		    	expect(data).to.have.property('hasLoginForm');
		    	expect(data.hasLoginForm).to.be.equal(false);
		    	expect(data).to.have.property('externalLinks');
		    	expect(data).to.have.property('internalLinks');
		    	done();
			});		  			
	});	
	
	it('GET /scrap/analize/:url should return error for invalid url', function(done){
		var response = http_mocks.createResponse();
		var request  = http_mocks.createRequest({
			method: 'GET',
			url: 'http://localhost:2000/scrap/analize/',
			params: {
				url: 'httpsaaj82us://ww.ertrerekdekingtory.c3om'
			}
		});	
		
		pageInfoController.getPageInfo(request, response);		
		
		var data = JSON.parse(response._getData());
		expect(data).to.have.property('error');
		done();
				  			
	});
});		

