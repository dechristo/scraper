const expect = require('chai').expect;
const nock = require('nock');
const pageInfoController = require('../../../app/src/controllers/pageInfoController');
const http_mocks = require('node-mocks-http')
const should = require('should')

var responseMock = {
  	  title : "Book Depository",
	  htmlVersion : "HTML 5",
	  headings : [1, 14, 98, 5, 0, 0],
  	  hasLoginForm : false
	}

describe('Page Info Controller', function() {
	var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
	var request  = http_mocks.createRequest({
		method: 'GET',
		url: 'http://localhost:2000/scrap/analize/',
		params: {
			url: encodeURIComponent('https://www.bookdepository.com')
		}
	});
	  
	it('GET /scrap/analize/:search should return json', function(done){
				 		
		pageInfoController.getPageInfo(request, response);
		
		var data = JSON.parse(response._getData());
    	expect(data).to.have.property('title');
    	expect(data).to.have.property('htmlVersion');
    	expect(data).to.have.property('headings');
    	expect(data.headings).to.be.an('array');
    	expect(data).to.have.property('hasLoginForm');
    	done();  			
	})
});		

