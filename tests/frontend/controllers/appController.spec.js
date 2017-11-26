describe("Scrap controller", function() {
   var $controller;
   var ScrapController;
   var httpBackend;

   beforeEach(angular.mock.module('app'));

   beforeEach(inject(function(_$httpBackend_, _$controller_) {
	   httpBackend = _$httpBackend_;
       $controller = _$controller_;
       ScrapController = $controller('AppController', {});
   }));

   it('should be defined.', function() {
        expect(ScrapController).toBeDefined();
   });

   it('should contains url var.', function(){
       expect(ScrapController.url).toBeDefined();
    });
   
   it('should contains pageInfo object defined.', function(){
       expect(ScrapController.pageInfo).toBeDefined();
       expect(typeof(ScrapController.pageInfo)).toBe('object');
    });
   
   it('should contains scrap() function defined.', function(){
       expect(ScrapController.scrap).toBeDefined();
       expect(typeof(ScrapController.scrap)).toBe('function');
    });
   
   describe('scrap()', function() {
	   it('should retrieve correct data from backend', function() {
		
		   httpBackend.expect('GET', '/scrap/analize/' + encodeURIComponent('https://www.bookdepository.com')).respond(200,
				   {
			   			title : 'Book Depository',
			   			htmlVersion : 'HTML 5',
			   			headings : [1, 14, 98, 5, 0, 0],
			   			hasLoginForm: true
				   });

		   url = 'https://www.bookdepository.com';
		   ScrapController.url = url;
		   ScrapController.scrap();
		    
		   expect(httpBackend.flush).not.toThrow();
		  		  
		   expect(ScrapController.pageInfo.title).toEqual('Book Depository');
		   expect(ScrapController.pageInfo.htmlVersion).toEqual('HTML 5');
		   expect(ScrapController.pageInfo.headings instanceof Array).toBe(true);
		   expect(ScrapController.pageInfo.headings).toEqual([1,14,98,5,0,0]);
	       expect(ScrapController.pageInfo.hasLoginForm).toEqual(true);
	    });
	});
});