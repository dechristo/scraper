angular
	.module('app')
	.controller('AppController', AppController)
	
function AppController($http) {
	var vm = this;
	vm.url = "";
	vm.scrap = scrap;
	vm.pageInfo = {};
	vm.showResult = false;

    function scrap() {
    	
    	if (!vm.url) {
    		return;
    	}
    	
    	console.log('url:' + vm.url);
        return $http.get('/scrap/analize/' + encodeURIComponent(vm.url)).then(handleSuccess, handleError);
    }
    
    function handleSuccess(response) {
    	vm.showResult = true;
    	vm.pageInfo.title = response.data.title;
    	vm.pageInfo.htmlVersion = response.data.htmlVersion;
    	vm.pageInfo.headings = response.data.headings;
    	vm.pageInfo.hasLoginForm = response.data.hasLoginForm;
    }
    
    function handleError(error) {
    	console.log(error);
    }
}
