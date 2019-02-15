const sinon = require('sinon');
const request = require('request');
const expect = require('chai').expect;
describe("Router", function () {
    let requestMock;

    beforeEach(() => {
        requestMock = sinon.stub(request, 'get');
    })

    afterEach(() => {
        request.get.restore();
    })

    describe("GET /", () => {
        it("should respond with HTTP 200", (done) => {
            requestMock.yields(null, {
                statusCode: 200,
                headers: {
                    'content-type': 'text/html; charset=UTF-8'
                    }   
                },   
                null);

            request.get('http://localhost:2000', (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('text/html; charset=UTF-8');
                done();
            });
        });    
    });

    describe("GET Analize", () => {
        it("should respond with HTTP 200 and json data", (done) => {
            const responseBodyMock = {
                status: 'success',
                data: {
                    htmlVersion: "HTML 5",
                    title: "Awesome!",
                    headings: [1, 12, 24, 0, 0, 0],
                    hasLoginForm: false,
                    internalLinks: 3,
                    externalLinks: 10
                }
            }

            requestMock.yields(null, {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                    }   
                },   
                JSON.stringify(responseBodyMock));

            request.get('http://localhost:2000/analize/www.somesite.com', (err, res, body) => {
                body = JSON.parse(body);
                expect(body.data).to.be.an('object');
                expect(body.data).to.have.all.keys('htmlVersion', 'headings',
                    'title', 'hasLoginForm', 'internalLinks', 'externalLinks');
                expect(body.data.htmlVersion).to.equal('HTML 5')
                expect(body.data.title).to.equal('Awesome!');
                expect(body.data.hasLoginForm).to.be.false;
                expect(body.data.internalLinks).to.equal(3);
                expect(body.data.externalLinks).to.equal(10);
                done();
            });
        });
    });
});