const expect = require("chai").expect;
const sinon = require("sinon");
const mocks = require('node-mocks-http');

const PageInfoController = require("../../app/src/controllers/pageInformationController");
const PageInformationService = require("./../../app/src/services/pageInformationService");

describe("Page Information Controller", () => {
    it("GET /scrap/analize/:url should return json data for valid url", async () => {
        mockRequest = mocks.createRequest();
        mockResponse = mocks.createResponse();

        sinon.stub(PageInformationService.prototype, "getPageInformation");
        spy = mockResponse.json = sinon.spy();

        await PageInfoController.getPageInformation(mockRequest, mockResponse);
   
        expect(spy.calledOnce).to.equal(true);
        expect(mockResponse).to.not.be.null;
        expect(mockResponse.statusCode).to.eql(200);               
    });
});

