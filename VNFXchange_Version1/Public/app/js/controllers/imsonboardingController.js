routerApp.controller('imsonboardingController',['$scope', '$sce','$http',function(scope,sce,http){

scope.onbpath='imsonbord.html';
scope.onboardFileSuccess=false;

scope.onboardimsfile=function(){ 
    console.log("onboarding---")
	scope.searchButton ='seraching';
	
	http.get("http://localhost:8080/vnfimsonboard")
		.then(function (response) {
		console.log("executedata"+response.data);
		scope.nval=false;
		      
			scope.names = response.data;
			scope.report = response.report;
		//document.getElementById('rep').className='active';
		//document.getElementById('test').className='';
		//scope.fpath='imsreports.html';
		  });
    
		setTimeout(function () {
		        scope.$apply(function(){
			    scope.onboardFileSuccess = true;	
		        scope.osuccessmessage="Sucessfully Onboarded";
		        scope.searchButton ='stop';
				console.log("Sucessfully Onboarded")
		
		  });
     	}, 729000);
		
	} 


}]);
