routerApp.controller('vnffuncController',['$scope','$location','$http',function(scope,loc,http){
	
	scope.fpath ='testcases.html';
	scope.nval=true;	
	scope.funvnftype='';
	scope.funvnfname='';
	scope.funtesttype='';
	scope.BasicVMChangetype ='';
	scope.httpChangetype ='';
	scope.exedate='';
//	var checkExecute  = $("#tstbutn");
//	checkExecute.prop('disabled', true);
	scope.isDis = true;
	scope.selectedName = '';
	scope.selectedVName = '';
	scope.viewDisplay = false;	
	scope.gotofun1=function(fpath){
		console.log("fpath---------------"+ fpath)
	scope.nval=true;
	scope.isDisabled = false;
		scope.fpath=fpath;

scope.viewDisplay = false;		
	}
	scope.isDisabled = false;
	
	scope.gotoexecute =function()
	{   
	    var svname=scope.selectedVName;
		var svtype=scope.selectedName;
		
		console.log("gotoexecute---" + scope.funvnfname);
		scope.isDisabled = true;
		scope.searchButtonText="Searching";
		document.getElementById('tstbutn').value="Executing ...";
		document.getElementById('tstbutn').style.margin="-7px 0 0 0";
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1;
	    var yyyy = today.getFullYear();
	    if(dd<10){
        dd='0'+dd;
	    } 
	    if(mm<10){
		mm='0'+mm;
	    } 
	    var today = dd+'/'+mm+'/'+yyyy;
		console.log("eedate"+today);
		scope.exedate=today;
		console.log("eedate"+scope.exedate);
		
		http({
			url:"http://localhost:8080/vnfexecute",
			method:"GET",
			params:{exe_vnfnam:svname,exe_type:svtype,exe_date:today}
		}).then(function (response) {
		console.log("executedata------------------"+response.data);
		scope.nval=false;
	//			http.get("http://localhost:8080/vnfreport")
	//			.then(function (response) {
	//			console.log("reportdata"+response.data);	
			
				setTimeout(function () {
		  scope.$apply(function(){
			  scope.searchButtonText="false";
			scope.names = response.data;
			scope.report = response.report;
			
            scope.viewDisplay = true;			
			
		document.getElementById('rep').className='active';
		document.getElementById('test').className='';
		scope.fpath='reports.html';
		  });
		}, 2000);
		
				
		
  //  });
					

			
		});
		
		
    }

	
	scope.ontypeChange =function(svtype){

	
		scope.showdrdwn=true;
		scope.funvnftype=svtype;
		console.log("------jjhgjhgjhg" + scope.funvnftype);
		var ovtype=scope.funvnftype.split(',');
		scope.selectedName=ovtype[1];
		console.log("------jjhgjhgjhg" + ovtype);
	
		http({
			url: "http://localhost:8080/vnfgetvnfname",
			params: {vnffuntypeid: ovtype[0]}
			
			}).then(function (response) {
				
			var sdata=JSON.stringify(response.data);
			
			var cdata=JSON.parse(sdata);
			
			scope.vimfunnames = cdata;
			console.log("gettingname"+ scope.vimfunnames)
			
	}); 
	
}

scope.onnameChange =function(sname){

	
		scope.showsanrdwn=true;
		scope.funvnfname=sname;
		scope.selectedVName = sname;
		console.log("------name" + sname);
		console.log("------name----------" + scope.selectedName);
}
scope.ontestChange =function(testtype){

	
		scope.showcheckbox=true;
		scope.showbtn=true;
		scope.funtesttype=testtype;
		console.log("------testtype" + testtype);
		/*var checker = document.getElementById('chckbtn');
		var exebtn = document.getElementById('tstbutn');
		checker.onchange = function(){
if(this.checked){
    exebtn.disabled = false;
} else {
    exebtn.disabled = true;
}
		}*/
		
}	

scope.BasicVMChange =function(checktype){
	
	scope.BasicVMChangetype = checktype;
	if(scope.BasicVMChangetype == true){
		console.log("checktype-------if"+ checktype)
		scope.isDis = false;
	}else{
		scope.isDis = true;
	}  
}
scope.HTTPTrafficChange =function(checktype){
	console.log("checktype-------"+ checktype)
	scope.httpChangetype = checktype;
	if(scope.httpChangetype == true){
		scope.isDis = false;
	}
}

	
	}]);
		
	