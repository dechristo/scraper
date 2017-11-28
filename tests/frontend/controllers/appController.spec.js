describe("App controller", function() {
   var $controller;
   var AppController;
   var httpBackend;

   beforeEach(angular.mock.module('app'));

   beforeEach(inject(function(_$httpBackend_, _$controller_) {
	   httpBackend = _$httpBackend_;
       $controller = _$controller_;
       AppController = $controller('AppController', {});
   }));

   it('should be defined.', function() {
        expect(AppController).toBeDefined();
   });

   it('should contains url var.', function(){
       expect(AppController.url).toBeDefined();
   });
   
   it('should contains errorMsg var.', function(){
       expect(AppController.url).toBeDefined();
   });
   
   it('should contains pageInfo object defined.', function(){
       expect(AppController.pageInfo).toBeDefined();
       expect(typeof(AppController.pageInfo)).toBe('object');
   });
   
   it('should contains showError var.', function(){
       expect(AppController.showError).toBeDefined();
       expect(AppController.showError).toBe(false);
   });
   
   it('should contains showResult var.', function(){
       expect(AppController.showResult).toBeDefined();
       expect(AppController.showResult).toBe(false);
   });

   it('should contains showLoader var.', function() {
       expect(AppController.showResult).toBeDefined();
	   expect(AppController.showResult).toBe(false);
   });
   
   it('should contains scrap() function defined.', function(){
       expect(AppController.scrap).toBeDefined();
       expect(typeof(AppController.scrap)).toBe('function');
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

		   var url = 'https://www.bookdepository.com';
		   AppController.url = url;
		   AppController.scrap();
		    
		   expect(httpBackend.flush).not.toThrow();
		  		  
		   expect(AppController.pageInfo.title).toEqual('Book Depository');
		   expect(AppController.pageInfo.htmlVersion).toEqual('HTML 5');
		   expect(AppController.pageInfo.headings instanceof Array).toBe(true);
		   expect(AppController.pageInfo.headings).toEqual([1,14,98,5,0,0]);
	       expect(AppController.pageInfo.hasLoginForm).toEqual(true);
	    });
	});
});
