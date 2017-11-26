const app = require('../app')
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();


chai.use(chaiHttp);

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

it('GET /analize/:search should return json', function(done) {
	chai.request(app)
    .get('/analize/www.google.com')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
});