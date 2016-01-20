//  ======================================================================
//  Author      : 석동훈
//  Date        : 2013. 12. 02. 
//  Description : 주소검색
//
//  ------------ MODIFICATIONLOG -----------------------------------------
//  Ver  Date            Author       Modification
//  
//  ======================================================================

	//신구주소를 조회한다.
	fnAddrSech = function (){
		$("#frm_wb_frm").attr("action","addrViewPop.do");
		$("#frm_wb_frm").submit();
	};
	
	//검색한 주소목록에서 주소를 선택한다.
	//parameter : pno = 우편번호
	//            ctprNm = 시도명
	//            provNm = 구/군 명
	//            dongStnm = 동명 or 대로명
	//            plNm = 배달처명/건물명
	//            lotBdgNo = 번지수 or 건물번호
	//            plNmYn = 건물명(0)/번지수범위(1) 여부
	//            mngNo = 관리번호(신주소조회인 경우)
	fnAddrSel = function (pno, ctprNm, provNm, dongStnm, plNm, lotBdgNo, plNmYn, mngNo){
		//우편번호
		$("#pno").val(pno);
		//상세주소
		$("#base_addr").val("[" + pno.substring(0,3) + "-" + pno.substring(3,6) + "] " + ctprNm + " " + provNm + " " + dongStnm);
		if(plNmYn == "0") {
			$("#dtail_addr").val(plNm);
		} else {
			if(plNm == "") {
				$("#dtail_addr").val(lotBdgNo);
			} else {
				$("#dtail_addr").val(lotBdgNo  + ", " + plNm);
			}
		}
	
		//신주소검색인 경우
		if(mngNo != null && mngNo != "") {
			//관리번호
			$("#mng_no").val(mngNo);
		}
		
	};
	
	

