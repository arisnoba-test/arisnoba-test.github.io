	// js 추가부분 : 패널에 관련된 부분을 추가한다.
	var jsUrlHost = "";
	
	var jsfiles = new Array(
		"js/common/lib/jquery-1.7.2.min.js"
		,"js/common/lib/jquery-ui-1.10.3.custom.js"
		,"js/common/lib/jquery.form.min.js"
		,"js/common/lib/jquery.blockUI.js"
		,"js/common/util/CommonError.js"
		,"js/common/util/CommonUtil.js"
		,"js/common/util/NumberUtil.js"
	);
	
	var setScriptFiles = function(_jsUrlHost,_jsfiles){
		var docWrite = ((navigator.userAgent).match("MSIE")||(navigator.userAgent).match("Safari"));
		
		for(var i=0, len=_jsfiles.length; i<len; i++){
			//외부URL로딩은 없다.
			/*var src = "";
			if(_jsfiles[i].indexOf("http://") > (-1)){
				src = _jsfiles[i];
			} else {
				src = _jsUrlHost + _jsfiles[i];
			}*/
			var src = "";
			
			if(_jsUrlHost){
				src = _jsUrlHost + _jsfiles[i];
			}else{
				src = _jsfiles[i];
			}
			
			if(docWrite){
				document.write("<script src='" + src + "' " + "type='text/javascript'></script>");
			}else{
				var s = document.createElement("script");
				s.src = src;
				var h = document.getElementsByTagName("head").length ? 
						document.getElementsByTagName("head")[0] : document.body;
				
				s.type = "text/javascript";
				h.appendChild(s);
			}
		}
	};
	
	setScriptFiles(jsUrlHost,jsfiles);