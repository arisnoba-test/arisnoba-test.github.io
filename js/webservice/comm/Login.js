//  ======================================================================
//  Author      : 석동훈
//  Date        : 2013. 12. 02. 
//  Description : 공통 로그인
//
//  ------------ MODIFICATIONLOG -----------------------------------------
//  Ver  Date            Author       Modification
//  
//  ======================================================================

// 쿠키 생성
function setCookie(cName, cValue, cDay){
      var expire = new Date();
      expire.setDate(expire.getDate() + cDay);
      cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
      if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
      document.cookie = cookies;
}

//쿠키 가져오기
function getCookie(cName) { 
      cName = cName + '=';
      var cookieData = document.cookie;
      var start = cookieData.indexOf(cName);
      var cValue = '';
      if(start != -1){
           start += cName.length;
           var end = cookieData.indexOf(';', start);
           if(end == -1)end = cookieData.length;
           cValue = cookieData.substring(start, end);
      }
      return unescape(cValue);
}
 
//쿠키 가져오기
function setUserId() {
	var sUserid = getCookie("name");

	if(sUserid != null && sUserid != "") {
		$("#user_id").val(sUserid);
		$("#chk_userid").attr("checked","checked");
	};
}

function fnLoginChk(){

	if($("#user_id").val() == "") 
	{
		return alert("사용자ID를 입력하여 주시기 바랍니다.");
	}
	
	if($("#pswd").val() == "") 
	{
		return alert("비밀번호를 입력하여 주시기 바랍니다.................");	//2:28 PM 2015-06-22
	}

	if($(":checkbox[name='chk_userid']:checked").val() != null && $(":checkbox[name='chk_userid']:checked").val() != "") {
		setCookie("name", $("#user_id").val(), 7);
	}
	
	var option = {
		url: "loginA.do",
		callbackFn: fnCallback,
		data: $("#loginFrm").serialize(),
		repeat: {"sFn":"loginChk","isDisplay":false,"lType":1,"lPos":2,"cType":1},
		error: {errorCd:"A",errorDv:""}
	};
	commonUtil.fnAjaxCall(option);
};

//주소검증 후 콜백 처리
function fnCallback(data){
	//alert("data.err_cd : " + data.err_cd);		//2:28 PM 2015-06-22
	//alert("annoCookie : " + annoCookie);	//2:28 PM 2015-06-22
	
	if(data.err_cd == "0000"){
	    url   = "loginPop.do";
	    
	    var annoCookie=getCookie("LoginAnnoPop"); // 쿠키네임 지정
	    
	    if (annoCookie != "no") {
	    	window.open('annoPopLogin.do','annoPop','scrollbars=no,toolbar=no,resizable=no,width=710,height=523');
	    }
		//window.open(url,'loginPop','scrollbars=no,toolbar=no,resizable=no,width=400,height=580');
		location.href="dlySchInq.do";
		//location.href="loginSuc.do" ;
	} else {
		alert(data.err_msg);
	}
};
