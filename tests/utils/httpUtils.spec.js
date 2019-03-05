/* eslint-disable promise/always-return */
require('sinon-stub-promise');
const httpUtils = require ('./../../app/src/utils/httpUtils');
const sinon = require('sinon');
const expect = require('chai').expect;


describe('Http Utils', () => {
    let sandbox = null;

    beforeEach(() => {        
        sandbox = sinon.createSandbox();       
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Resolved promise returns object', () =>{
        it('should test a promise', () => {
            sandbox.stub(httpUtils, 'doGetRequest')
                .resolves(Promise.resolve({msg: 'request succeeded.'}));                             
            return httpUtils.doGetRequest()
                .then(response => {
                    expect(response).to.be.an('object');
                    expect(response).to.haveOwnProperty('msg');
                    expect(response.msg).to.equal('request succeeded.');                                      
                }) ;                              
        });
    });

    describe('Rejected promise returns error message', () =>{
        it('should test a promise', () => {
            sandbox.stub(httpUtils, 'doGetRequest')              
                .returns(Promise.reject(new Error('error executing get request.')));                             
            return httpUtils.doGetRequest()                
                .catch(err => {                    
                    expect(err).to.an('error');                    
                    expect(err.message).to.equal('error executing get request.');                                                               
                });
        });
    });
});
