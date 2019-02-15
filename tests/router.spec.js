const sinon = require('sinon');
const assert = require('assert');
const request = require('request');
const server = require('./../app/server');
const PageInformationController = require('../app/src/controllers/pageInformationController');

describe("Router", function() {
    
    describe("GET /", () => {       
        it("should respond with HTTP 200", (done) => {
            request.get('http://localhost:2000', (req, res) => {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
    });

    describe("GET Analize", () => {       
      it("should respond with HTTP 200 and json data", async () => {
        const responseMock = {
                htmlVersion: "HTML 5",
                title: "Awesome!",  
                headings: [1, 12, 24, 0, 0, 0 ],
                hasLoginForm: false,
                internalLinks: 3,
                externalLinks: 10
            }
            sinon.stub(PageInformationController, 'getPageInformation')
                .callsFake(() => responseMock);

            const res = await PageInformationController.getPageInformation();
            assert.equal(typeof(res), 'object');
            assert.equal(res.htmlVersion, 'HTML 5');
            assert.equal(res.title, 'Awesome!');
            assert.equal(res.hasLoginForm, false);
            assert.equal(res.internalLinks, 3);
            assert.equal(res.externalLinks, 10);
        });
    });
});