angular
	.module('app')
	.controller('AppController', AppController)
	
function AppController($http) {
	var vm = this;
	vm.url = "";
	vm.scrap = scrap;
	vm.pageInfo = {};
	vm.showResult = false;
	vm.showError = false;
	vm.showLoader = false;
	vm.errorMsg = ''

    function scrap() {
    	
    	if (!vm.url) {
    		return;
    	}
    	
    	vm.showError = false;
    	vm.showLoader = false;
    	vm.showLoader = true;
        return $http.get('/scrap/analize/' + encodeURIComponent(vm.url)).then(handleSuccess, handleError);
    }
    
    function handleSuccess(response) {
		vm.showLoader = false;
		vm.showError = false;
    	vm.showResult = true;
    	vm.errorMsg = ''
    	vm.pageInfo.title = response.data.title;
    	vm.pageInfo.htmlVersion = response.data.htmlVersion;
    	vm.pageInfo.headings = response.data.headings;
    	vm.pageInfo.hasLoginForm = response.data.hasLoginForm;
    	vm.pageInfo.externalLinks = response.data.externalLinks;
    	vm.pageInfo.internalLinks = response.data.internalLinks;
    }
    
    function handleError(error) {
    	vm.showLoader = false;
    	vm.showResult = false;
    	vm.errorMsg = error.status + ':' + error.data.error;
    	vm.showError = true;
    }
}
