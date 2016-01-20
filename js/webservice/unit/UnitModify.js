//  ======================================================================
//  Author      : 김병찬
//  Date        : 2011. 07. 29. 
//  Description : 게시물 수정
//
//  ------------ MODIFICATIONLOG -----------------------------------------
//  Ver  Date            Author       Modification
//  
//  ======================================================================

var f_wbFnUnitModify = new wbFnUnitModify();

function wbFnUnitModify(){
	// 함수 선언
	var t_wbFnUnitModify = this;
	
	// 게시물 목록 가져오기
	this.fnSearchPage = function(){
		// 현재 페이지 유지.
		var objForm = document.frm;
		objForm.target = "_self";
		objForm.action = "wb.getUnitList.do";
		objForm.submit();
	};
   	// 게시물 수정
	this.fnModify = function(){
		var objForm = document.frm;
		
		if($("#btn_wb_title").val() == ""){
			alert("제목을 입력하세요.");
			$("#btn_wb_title").focus();
			return;
		}
		if($("#txa_wb_text").val() == ""){
			alert("내용을 입력하세요.");
			$("#txa_wb_text").focus();
			return;
		}
		
		var option = {
				url: "wb.updateUnit.do",
				callbackFn: f_wbFnUnitModify.fnCallback,
				data: commonUtil.setQueryString(objForm),
				repeat: {"sFn":"f_wbFnUnitModify.fnModify","isDisplay":false,"lType":1,"lPos":2,"cType":1},
				error: {errorCd:"A",errorDv:""}
			};
			commonUtil.fnAjaxCall(option);
	};
	// 수정 후 콜백 처리
	this.fnCallback = function(){
		alert("수정 완료했습니다.");
		f_wbFnUnitModify.fnSearchPage();
	};
}