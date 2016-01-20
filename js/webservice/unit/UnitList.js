//  ======================================================================
//  Author      : 김진백
//  Date        : 2011. 07. 29. 
//  Description : 게시물 목록
//
//  ------------ MODIFICATIONLOG -----------------------------------------
//  Ver  Date            Author       Modification
//  
//  ======================================================================

var f_wbFnUnitList = new wbFnUnitList();

function wbFnUnitList(){
	// 함수 선언
	var t_wbFnUnitList = this;
	
	// 게시물 목록 가져오기
	this.fnSearchPage = function(ipage){
		var objForm = document.frm;
		$("#btn_wb_f_current_page").val(ipage);
		objForm.target = "_self";
		objForm.action = "wb.getUnitList.do";
		objForm.submit();
	};
	// 게시물 등록 화면 호출
	this.fnGetReg = function(){
		var objForm = document.frm;
		objForm.action = "wb.getUnitRegView.do";
		objForm.submit();
	};
	// 게시물 수정 화면 호출
	this.fnGetModify = function(no){
		var objForm = document.frm;
		$("#btn_wb_board_seq").val(no);
		objForm.action = "wb.getUnitModifyView.do";
		objForm.submit();
	};
	// 게시물 삭제
	this.fnDelete = function(no){
		var objForm = document.frm;
		$("#btn_wb_board_seq").val(no);
		
		if(confirm("선택한 항목을 삭제하시겠습니까?")){
			
			var option = {
				url: "wb.deleteUnit.do",
				callbackFn: f_wbFnUnitList.fnCallback,
				data: commonUtil.setQueryString(objForm),
				repeat: {"sFn":"f_wbFnUnitList.fnDelete","isDisplay":false,"lType":1,"lPos":2,"cType":1},
				error: {errorCd:"A",errorDv:""}
			};
			commonUtil.fnAjaxCall(option);
		}
	};
	// 삭제 후 콜백 처리
	this.fnCallback = function(){
		// 현재 페이지 유지.
		var iCurrentpage = "<%=iCurrentpage%>";
		var iPagePerRows = "<%=iPagePerRows%>";
		// 삭제 건수 만큼 빼주어야 한다.
		// 추후 여러 사람이 동시에 삭제 할 경우 전체 건수를 가지고 오는 로직이 들어가야 한다.
		var iTotalRowCount = "<%=iTotalRowCount-1%>"; // 삭제 건수 만큼 빼주어야 한다.
		var iPage = 1;
		if(iPagePerRows == (iCurrentpage * iPagePerRows - iTotalRowCount)){
			$("#btn_wb_f_current_page").val(iCurrentpage-1);
		}
		iPage = $("#btn_wb_f_current_page").val();
		alert("삭제 완료했습니다.");
		
		f_wbFnUnitList.fnSearchPage(iPage);
	};
}
