//  ======================================================================
//  Author      : 석동훈
//  Date        : 2013. 12. 02. 
//  Description : 숫자입력 체크
//
//  ------------ MODIFICATIONLOG -----------------------------------------
//  Ver  Date            Author       Modification
//  
//  ======================================================================
	//숫자만 입력가능
	fn_Number = function (obj, e){
		if(e.which=='229' || e.which=='197' && $.browser.opera) {
				setInterval(function(){
					 	obj.trigger('keyup');
					}, 100);
			   }
			       
		       if ( ! (e.which && ((e.which > 47 && e.which < 58) || (e.which > 95 && e.which < 106))|| e.which ==8 || e.which ==9|| e.which ==13|| e.which ==0 ||e.which==46 ||e.which==37 ||e.which==39 || (e.ctrlKey && e.which ==86) ) ) {
				 	e.preventDefault();
		       }
			  
		       var value = obj.val().match(/[^0-9]/g);
		       if(value!=null) {
			   		obj.val(obj.val().replace(/[^0-9]/g,''));
		       }
			   
	};
	
	//숫자와 '-' 만 입력가능
	fn_NumberDash = function (obj, e){
		if(e.which=='229' || e.which=='197' && $.browser.opera) {
					setInterval(function(){
					 	obj.trigger('keyup');
					}, 100);
			   }
			       
		       if ( ! (e.which && ((e.which > 47 && e.which < 58) || (e.which > 95 && e.which < 106))|| e.which ==8 || e.which ==9|| e.which ==13|| e.which ==0|| e.which ==189 || (e.ctrlKey && e.which ==86)) ) {
				 	e.preventDefault();
		       }
			  
		       var value = obj.val().match(/[^0-9-]/g);
		       if(value!=null) {
			   		obj.val(obj.val().replace(/[^0-9-]/g,''));
		       }
	};
	
	fn_sCom=function (num){
		
		if(num!=null && num!=""){
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
		else
			return num;
	};
	
	fn_rCom=function(num){
		if(num!=null && num!="")
			return parseInt(num.replace(/,/g,""));
		else
			return "";
	};