const sinon = require('sinon');
const expect = require('chai').expect;
const cheerio = require('cheerio');

const httpUtils = require('./../../app/src/utils/httpUtils');
const PageInformationService = require("./../../app/src/services/pageInformationService");
let pageInformationService = null;
let sandbox = null;

describe('Page Information Service', () => {
    beforeEach(() => { 
        sandbox = sinon.createSandbox();    
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getPageInformation()', () => {
        it ('should resolve the promise with a response for a valid url.', async () => {             
            sandbox.stub(httpUtils, 'doGetRequest').resolves(`
                <html>
                <head>
                    <title>Unit testing service</title>
                </head>
                <body></body>
                </html>`);
            pageInformationService = new PageInformationService();
            let response = await pageInformationService.getPageInformation('www.someurl.com');

            expect(response).to.be.deep.equal({
                "htmlVersion":"HTML <= 4",
                "title": "Unit testing service",
                "headings": [0,0,0,0,0,0],
                "hasLoginForm": false,
                "internalLinks": 0,
                "externalLinks": 0
            });            
        });  

        it ('should reject the promise for an empty url.', async () => {             
            sandbox.stub(httpUtils, 'doGetRequest').rejects(new Error('invalid url'));
            pageInformationService = new PageInformationService();
            let response = await pageInformationService.getPageInformation('');

            expect(response).to.be.haveOwnProperty('error');
            expect(response.error.message).to.equal('invalid url');            
        });  
    });

    describe('getHtmlVersion()', () => {
        it ('should return 5 for specified doctype version tag lower case.', () => {             
            const data =
                `<!DOCTYPE html>
                <html>
                <head>
                    <title>Unit testing service</title>
                </head>
                <body></body>
                </html>`;
            pageInformationService = new PageInformationService();
            let version = pageInformationService.getHtmlVersion(data);

            expect(version).to.be.equal("HTML 5");            
        });  

        it ('should return 5 for specified doctype version tag upper case.', () => {             
            const data = 
                `<!DOCTYPE html>
                <html>
                <head>
                    <title>Unit testing service</title>
                </head>
                <body></body>
                </html>`;
            pageInformationService = new PageInformationService();
            let version = pageInformationService.getHtmlVersion(data);

            expect(version).to.be.equal("HTML 5");            
        }); 

        it ('should return <= 4 for unspecified doc version tag.', () => {            
            const data =               
                `<html>
                <head>
                    <title>Unit testing service</title>
                </head>
                <body></body>
                </html>`;
            pageInformationService = new PageInformationService();
            let version = pageInformationService.getHtmlVersion(data);

            expect(version).to.be.equal("HTML <= 4");            
        });  
    });

    describe('getHeadings()', () => {
        it ('should return an array with heading quantities.', () => {             
            
            pageInformationService = new PageInformationService();
            let headings = pageInformationService.getHeadings(cheerio.load('<h1></h1><h1></h1><h4></h4>'));

            expect(headings).to.be.deep.equal([2,0,0,1,0,0]);            
        });  
    });

    describe('getHeadings()', () => {
        it ('should return an array with zeroes for if page has no headers.', () => {             
            
            pageInformationService = new PageInformationService();
            let headings = pageInformationService.getHeadings(cheerio.load('<html></html>'));

            expect(headings).to.be.deep.equal([0,0,0,0,0,0]);            
        });  
    });

    describe('hasLoginForm()', () => {
        it ('should return true if page has password input.', () => {             
            
            pageInformationService = new PageInformationService();
            let hasLoginForm = pageInformationService.hasLoginForm(cheerio.load('<html><body><input type="password"/></body></html>'));

            expect(hasLoginForm).to.be.true;            
        });  
    });

    describe('hasLoginForm()', () => {
        it ('should return false if page does not have password input.', () => {             
            
            pageInformationService = new PageInformationService();
            let hasLoginForm = pageInformationService.hasLoginForm(cheerio.load('<html><body><input type="text"/><input type="radio"/></body></html>'));

            expect(hasLoginForm).to.be.false;            
        });  
    });

    describe('hasLoginForm()', () => {
        it ('should return false if page does not have inputs.', () => {             
            
            pageInformationService = new PageInformationService();
            let hasLoginForm = pageInformationService.hasLoginForm(cheerio.load('<html><body></body></html>'));

            expect(hasLoginForm).to.be.false;            
        });  
    });

    describe('getLinks()', () => {
        it ('should return object of external and internal links quantity.', () => {             
            pageInformationService = new PageInformationService();
            let links = pageInformationService.getLinks(cheerio.load('<html><body></body></html>'));

            expect(links).to.be.an('object');            
            expect(links).to.haveOwnProperty('internal');
            expect(links.internal).to.be.an('array');
            expect(links).to.haveOwnProperty('external');
            expect(links.external).to.be.an('array');
            expect(links.internal).to.be.empty;
            expect(links.external).to.be.empty;
        });  
    });
});