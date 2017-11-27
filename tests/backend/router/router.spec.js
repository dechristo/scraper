var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../../app')
var should = chai.should();


chai.use(chaiHttp);

describe('Router endpoints', function() {
	
	it('GET / should redirect to home', function(done) {
		chai.request(app)
	    .get('/scrap')
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.have.header('content-type');
	      res.header['content-type'].should.be.equal('text/html; charset=UTF-8');
	      res.should.have.header('content-length');
	      done();
	    });
	});
	
	it('GET /scrap/analize/:search should return json', function(done) {
		chai.request(app)
	    .get('/scrap/analize/' + encodeURIComponent('https://www.bookdepository.com'))
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.type.should.equal('application/json');
	      done();
	    });
	});
})